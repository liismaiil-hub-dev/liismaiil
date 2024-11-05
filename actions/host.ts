'use server'
import { dbFirestore } from "@/app/api/graphql/fb-utils-admin";
import { GuestType, LIISMAIIL_STATUS_ENUM } from "@/app/api/graphql/profile/profile.types";
import prisma from "@/lib/prisma-db";
import organisations from "@/store/shares/organisations.json";
import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";
import _ from "lodash";
import { memoize } from "nextjs-better-unstable-cache";

const hostSearch = organisations.map((org) => {
    return ({ login: org.login, uid: org.uid, geoCoords: { lat: org.coords.lat, long: org.coords.long } })
})


export async function getHosts() {
    try {
        //console.log({ firestore });
        const snapshot = await dbFirestore.collection('guests').get();

        const guests: GuestType[] = [];
        snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
            const guest = await doc?.data()!;
            guests.push(guest as GuestType);
        });
        console.log({ hosts: guests });

        return guests;
    } catch (error: any) {
        console.log({ error });
        throw new Error(error);
    }
}
export const getHostsForDashboard = memoize(async () => {

    const guests = await prisma.guest.findMany({
        where: { status: LIISMAIIL_STATUS_ENUM.HOST }
    })
    return guests;
}, {
    persist: true,
    revalidateTags: ['dashboard:guests'],
    suppressWarnings: true,
    log: ['datacache', 'verbose', 'dedupe'],
    logid: 'dashboard: guests'
})

/**
 * Fetches the data layers information from the Solar API.
 *   https://developers.google.com/maps/documentation/solar/data-layers
 *
 * @param  {host} location      Point of interest as latitude longitude.
 * @param  {number} radiusMeters  Radius of the data layer size in meters.
 * @param  {string} apiKey        Google Cloud API key.
 * @return {Promise<DataLayersResponse>}  Data Layers response.
 */
export async function getDataLayerUrls({ country = 'SE', host = "3jtczfl93BWlud2t3Q44KdC0EVJ3" }: { country: string, host: string }): Promise<any> {
    const radiusMeters = 5;

    const hostState = "3jtczfl93BWlud2t3Q44KdC0EVJ3"
    const countryState = 'SE'



    const hostForSearch: any = await _.filter(organisations, function (org) {
        return org.uid === hostState
    })
    console.log({ hostState, hostForSearch, organisationsUIDS: organisations.map((org) => org.uid) });

    const location = { lat: hostForSearch[0]?.coords.lat, lng: hostForSearch[0]?.coords.long }
    const args = {
        'location.latitude': location.lat,//.toFixed(5),
        'location.longitude': location.lng,//.toFixed(5),
        radius_meters: radiusMeters.toString(),
        // The Solar API always returns the highest quality imagery available.
        // By default the API asks for HIGH quality, which means that HIGH quality isn't available,
        // but there is an existing MEDIUM or LOW quality, it won't return anything.
        // Here we ask for *at least* LOW quality, but if there's a higher quality available,
        // the Solar API will return us the highest quality available.
        required_quality: 'LOW',
    };
    console.log('GET dataLayers\n', args);
    const params = new URLSearchParams({ ...args, key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY });
    // https://developers.google.com/maps/documentation/solar/reference/rest/v1/dataLayers/get
    return fetch(`https://solar.googleapis.com/v1/dataLayers:get?${params}`).then(
        async (response) => {
            const content = await response.json();
            if (response.status != 200) {
                console.error('getDataLayerUrls\n', content);
                throw content;
            }
            console.log('dataLayersResponse', content);
            return content;
        },
    );
}
/**
 * Fetches the building insights information from the Solar API.
 *   https://developers.google.com/maps/documentation/solar/building-insights
 *
 * @param  {LatLng} location      Point of interest as latitude longitude.
 * @param  {string} apiKey        Google Cloud API key.
 * @return {Promise<DataLayersResponse>}  Building Insights response.
 */
export async function findClosestBuilding(
    location: { lat: string, lng: string },
    apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
): Promise<BuildingInsightsResponse> {
    const args = {
        'location.latitude': location.lat, //().toFixed(5),
        'location.longitude': location.lng//().toFixed(5),
    };
    console.log('GET buildingInsights\n', args);
    const params = new URLSearchParams({ ...args, key: apiKey });
    // https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest
    return fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}`).then(
        async (response) => {
            const content = await response.json();
            if (response.status != 200) {
                console.error('findClosestBuilding\n', content);
                throw content;
            }
            console.log('buildingInsightsResponse', content);
            return content;
        },
    );
}
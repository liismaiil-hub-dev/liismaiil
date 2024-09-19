import { DateTimeResolver } from 'graphql-scalars';

import {
  AddFavoriteConnectionsInput,
  AddProfileInput,
  AddProfileOutput,
  AddStatusInput,
  AddStatusOutput,
  FlagTokenOutput,
 
  GuestType,
  ProfileTypeData,
  PromoteInputType,
  SendMessageInput,
  UpdateAddressInput,
  UpdateProductsCartsInput,
  UpdateProfileAddressGeoCoordsInput,
  UpdateProfileInput
} from '@/api/profile/profile.types';
import { OkSuccess, PROFILE_STATUS_ENUM } from '@/api/viewer/viewer.types';
import { DocumentData, DocumentReference, DocumentSnapshot, Firestore } from 'firebase-admin/firestore';
const profile = async (
  _: undefined,
  { id }: { id: string },
  {
    dbFirestore
  }: {
    dbFirestore: Firestore;
  }
): Promise<ProfileTypeData | undefined> => {
  if (id) {
    try {
      const dbProfiles = dbFirestore.collection('profiles');
      const profileRef: DocumentReference = await dbProfiles.doc(id);
      const profileSnapshot = await profileRef.get();
      if (profileSnapshot.exists) {
        if (profileSnapshot?.data()?.status === 'ADMIN') {
          return { ...profileSnapshot.data(), status: 'ADMIN' } as ProfileTypeData;
          /* 
            startDate: new Date().toISOString(),
            endDate: new Date(moment(new Date()).add(1, 'months')).toISOString(),
*/
        } else {
          return { ...profileSnapshot.data() } as ProfileTypeData;
        }
      } else {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  } else {
    return undefined;
  }
};

const profiles = async (
  _: undefined,
  __: undefined,
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<ProfileTypeData[] | undefined> => {
  try {
    //console.log({ firestore });
    const snapshot = await dbFirestore.collection('profiles').get();

    const profiles: ProfileTypeData[] = [];
    snapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const profile = await doc?.data()!;
      profiles.push(profile as ProfileTypeData);
    });

    return profiles;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
};
const guests = async (
  _: undefined,
  __: undefined,
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<GuestType[] | undefined> => {
  try {
    //console.log({ firestore });
    const snapshot = await dbFirestore.collection('guests').get();

    const guests: GuestType[] = [];
    snapshot.forEach(async (doc: DocumentSnapshot<GuestType | DocumentData>) => {
      const guest = await doc?.data()!;
      guests.push(guest as GuestType);
    });

    return guests;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
};
//Mutations

const addProfile = async (
  _: undefined,
  { input }: { input: AddProfileInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<AddProfileOutput | undefined> => {
  try {
    const { id, email } = input;
    const profileSnapshot = await dbFirestore.collection('profiles').doc(`${id}`).get();
    if (profileSnapshot.exists) {
      const { _id, email } = profileSnapshot.data() as ProfileTypeData;
      if (typeof email === 'undefined') {
        dbFirestore.collection('profiles').doc(`${id}`).set({ _id: id, email }, { merge: true });
        return { _id: id, email };
      } else {
        return { _id, email };
      }
    } else {
      dbFirestore.collection('profiles').doc(`${id}`).set({ _id: id, email });
      return { _id: id, email };
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

const updateProfile = async (
  _: undefined,
  { input }: { input: UpdateProfileInput },
  { dbFirestore, timeStamp }: { dbFirestore: Firestore; timeStamp: unknown }
): Promise<ProfileTypeData | undefined> => {
  try {
    const { id, phone, login } = input;

    const updatedAt = timeStamp;
    const docRef = dbFirestore.collection('profiles').doc(`${id}`);
    return docRef
      .get()
      .then((snapshot: any) => {
        if (snapshot.exists) {
          return docRef
            .set({ login, phone, updatedAt }, { merge: true })
            .then(() => {
              return profile(_, { id }, { dbFirestore }).then((profileData: ProfileTypeData | undefined) => {
                return profileData;
              });
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        } else {
          throw new Error('can t find profile in database');
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  } catch (error: any) {
    throw new Error(error);
  }
};

const setEmailVerified = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, timeStamp }: { dbFirestore: Firestore; timeStamp: unknown }
): Promise<{ success: boolean; email: string } | undefined> => {
  try {
    const updatedAt = timeStamp;
    const docRef = dbFirestore.collection('profiles').doc(`${id}`);
    return docRef
      .get()
      .then((snapshot: any) => {
        if (snapshot.exists) {
          return docRef
            .set({ verified: true, updatedAt }, { merge: true })
            .then(() => {
              return { success: true, email: snapshot.data().email };
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        } else {
          return { success: false, email: '' };
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  } catch (error: any) {
    throw new Error(error);
  }
};

const getEmailVerified = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean; verified: boolean } | undefined> => {
  try {
    //  const currentUser = await auth.verifyIdToken(req.headers.authtoken);
    const dbProfiles = dbFirestore.collection('profiles');

    if (id) {
      const profileRef = await dbProfiles.doc(id);
      return profileRef
        .get()
        .then((profileSnapshot: any) => {
          if (profileSnapshot.exists && profileSnapshot.data()) {
            if (typeof profileSnapshot.data().verified !== 'undefined' && profileSnapshot.data().verified) {
              return { success: true, verified: profileSnapshot.data().verified };
            } else {
              return { success: true, verified: false };
            }
          } else {
            return { success: false, verified: false };
          }
        })
        .catch((error: any) => {
          throw new Error(error);
        });
    } else {
      return { success: false, verified: false };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

/* const getEvents = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean, verified: boolean } | undefined> => {
  try {
    //  const currentUser = await auth.verifyIdToken(req.headers.authtoken);
    const dbEvents = dbFirestore.collection('events');

    if (id) {
      const profileRef = await dbProfiles.doc(id);
      return profileRef
        .get()
        .then((eventsSnapshot: unknown) => {
          if (eventsSnapshot.exists && eventsSnapshot.data()) {
            if (typeof eventsSnapshot.data() !== 'undefined' && eventsSnapshot.data()) {

              return { success: true, events: eventsSnapshot.data() }
            }
          } else {
            return { success: true, verified: false }
          }
        })
        .catch((error: unknown) => {

          throw new Error(error);
        });
    } else {
      return { success: false, verified: false }

    }
  } catch (error: unknown) {
    throw new Error(error);
  }
}; */
const updateProductsCarts = async (
  _: undefined,
  { input }: { input: UpdateProductsCartsInput },
  { dbFirestore, FieldValue }: { dbFirestore: Firestore; FieldValue: any; timeStamp: any }
): Promise<{ success: boolean; message: string } | undefined> => {
  try {
    const { cart, profileId } = input;

    console.log({ cart });
    const dbProfiles = dbFirestore.collection('profiles');

    if (profileId) {
      const profileRef = await dbProfiles.doc(`${profileId}`);
      return profileRef
        .get()
        .then(async (profileSnapshot: unknown) => {
          if (profileSnapshot?.exists) {
            /*   console.log(profileSnapshot.data()) */
            await profileRef.collection('carts').add({});
            return {
              success: true,
              message: cart
            };
          } else {
            return {
              success: false,
              message: 'NO'
            };
          }
        })
        .catch((error: any) => {
          throw new Error(error);
        });
    } else {
      return {
        success: false,
        message: 'NO'
      };
    }
  } catch (error: any) {
    throw error;
  }
};
/* const updateEnrollmentsCarts = async (
  _: undefined,
  { input }: { input: UpdateEnrollmentsCartsInput },
  { dbFirestore, FieldValue }: { dbFirestore: Firestore; FieldValue: unknown; timeStamp: unknown }
): Promise<{ success: boolean, message: string } | undefined> => {
  try {
    const { cart, profileId, enrollment } = input

    const dbProfiles = dbFirestore.collection('profiles');
    if (profileId) {
      const profileRef = await dbProfiles.doc(`${profileId}`);
      return profileRef
        .get()
        .then(async (profileSnapshot: any) => {
          if (profileSnapshot?.exists) {
            await profileRef.collection('enrollmentCarts').doc(enrollment.token).set({
              enrollment
            });
            return {
              success: true,
              message: cart
            }
          } else {
            return {
              success: false,
              message: 'NO'
            }
          }
        }).catch((error: any) => {
          throw new Error(error);
        });
    } else {
      return {
        success: false,
        message: 'NO ProfileId'
      }
    }
  } catch (error: any) {
    throw error;
  }
} */
const updateAddress = async (
  _: undefined,
  { input }: { input: UpdateAddressInput },
  { dbFirestore, timeStamp }: { dbFirestore: Firestore; timeStamp: unknown }
): Promise<ProfileTypeData> => {
  try {
    const { id, name, destination, building, street, city, state, country, contact, zip } = input;

    const updatedAt = timeStamp;
    const docRef = dbFirestore.collection('profiles').doc(`${id}`);
    return docRef
      .get()
      .then((snapshot: any) => {
        if (snapshot.exists) {
          return docRef
            .set(
              {
                address: { name, destination, building, street, city, state, country, contact, zip },
                updatedAt
              },
              { merge: true }
            )
            .then(() => {
              return profile(_, { id }, { dbFirestore }).then((profileData: ProfileTypeData | undefined) => {
                return profileData;
              });
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        } else {
          throw new Error('can t find profile in database');
        }
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  } catch (error: any) {
    throw new Error(error);

  }

};

const updateProfileAddressGeoCoords = async (
  _: undefined,
  { input }: { input: UpdateProfileAddressGeoCoordsInput },
  { dbFirestore, timeStamp }: { dbFirestore: Firestore; timeStamp: unknown }
): Promise<OkSuccess | undefined> => {
  try {
    const { id, coords, addressGeo } = input;

    const updatedAt = timeStamp;
    const docRef = await dbFirestore.collection('profiles').doc(`${id}`);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      await docRef.set(
        {
          coords,
          addressGeo
        },
        { merge: true }
      );
      return {
        success: true,
        message: JSON.stringify({
          coords,
          addressGeo
        })
      };
    } else {
      return { success: false, message: 'profile dont exists on firebase' };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
const sendMessage = async (
  _: undefined,
  { input }: { input: SendMessageInput },
  {
    dbFirestore,
    timeStamp,
    FieldValue
  }: {
    FieldValue: FieldValue;
    dbFirestore: Firestore;
    timeStamp: string;
  }
): Promise<{ success: boolean; message: string } | undefined> => {
  try {
    const { profileId, profileEmail, parent, product, collaboratorEmail, subject, content, collaboratorId } = input;

    const updatedAt = timeStamp;
    const docRef = await dbFirestore.collection('messages').doc(collaboratorId!).collection(profileId).add({
      profileEmail,
      product,
      collaboratorEmail,
      subject,
      content,
      collaboratorId,
      createdAt: updatedAt,
      parent
    });
    console.log({ docRef });
    await dbFirestore
      .collection('profiles')
      .doc(`${profileId}`)
      ?.update({
        messages: FieldValue.arrayUnion(docRef.id)
      });

    return { success: true, message: `${subject} was sent to ${collaboratorEmail}` };
  } catch (error: FirestoreError | unknown) {
    console.log(error);
    return { success: false, message: `${error}` };
  }
};
const removeMessage = async (
  _: undefined,
  { id }: { id: string },
  {
    dbFirestore,
    timeStamp
  }: {
    FieldValue: unknown;
    dbFirestore: { collection: (arg: string) => {} };
    timeStamp: {};
  }
): Promise<{ success: boolean; message: string } | undefined> => {
  try {
    await dbFirestore.collection('messages').doc(`${id}`).delete();
    return { success: true, message: `message ${id} was deleted` };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: `${error}` };
  }
};
const removeProfile = async (
  _: undefined,
  __: undefined,
  { currentProfile, dbFirestore }: { currentProfile: unknown; dbFirestore: Firestore; timeStamp: unknown }
): Promise<boolean> => {
  try {
    // console.log({ currentUserUpdatePrublic: currentUser });
    const { id } = currentProfile;
    //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
    await dbFirestore.collection('profiles').doc(`${id}`).delete();
    return true;
  } catch (error: any) {
    // console.error(error);
    throw new Error(error);
  }
};
const promote = async (
  _: undefined,
  { input }: { input: PromoteInputType },
  { dbFirestore, slug, FieldValue }: { dbFirestore: Firestore; slug: unknown; FieldValue: any }
): Promise<ProfileTypeData | undefined> => {
  const { id, titleSlug, selectionSlug, login } = input;
  try {
    await dbFirestore
      .collection('profiles')
      .doc(id)
      .update({ productsPromoted: FieldValue.arrayUnion({ titleSlug, selectionSlug }) });
    try {
      await dbFirestore
        .collection('products')
        .doc(titleSlug)
        .update({ promotedBy: FieldValue.arrayUnion(slug(login)) });
    } catch (error: any) {
      throw new Error(error);
    }
  } catch (error: any) {
    throw new Error(error);
  }
  try {
    const profileDocRef = await dbFirestore.collection('profiles').doc(id);
    const snapshot = await profileDocRef.get();
    if (snapshot.exists) {
      return snapshot.data();
    } else {
      throw new Error('Cant get profile data with promoted product');
    }
  } catch (error) {
    throw new Error('Cant get profile data with promoted product');
  }
};
/* const guestEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { dbFirestore, slug, ViewerModel, FieldValue }:
    { dbFirestore: Firestore, slug: (s: string) => string, ViewerModel: unknown, FieldValue: unknown }):
  Promise<GuestEnrollmentOutput | undefined> => {
  const { profileId, profileEmail, title,
    description, collaboratorEmail, collaboratorId, price, status,
    token, flag, startDate, endDate, payment } = input
  try {
    const newGuest = await dbFirestore.collection('guests').doc(profileId).add({
      title,
      description,
      collaboratorEmail,
      collaboratorId,
      profileEmail,
      status,
      token,
      flag,
      price,
      payment,
      startDate,
      endDate,
    })
    console.log({ newGuest, data: newGuest.data() })
    const accessor = await dbFirestore.collection('profiles').doc(collaboratorId).collection('guest').add({ guestId: newGuest.data()._id })
    // add Guest Collection

    return {
      success: true,
      message: title,
      description,
      collaboratorEmail,
      collaboratorId,
      status,
      token,
      flag,
      price,
      payment,
      startDate,
      endDate,
    }

  } catch (error: any) {
    throw new Error(error)
  }

} */
const copyFromViewer = async (
  _: undefined,
  { input }: { input: { id: string; email: string } },
  { dbFirestore, ViewerModel }: { dbFirestore: Firestore; ViewerModel: any }
): Promise<{ success: boolean } | undefined> => {
  const { id, email } = input;
  console.log({ id, email });
  try {
    const viewer = await ViewerModel.findOne({ email }).lean().exec();
    if (viewer && viewer.email === email && viewer.addressGeo) {
      await dbFirestore.collection('profiles').doc(id).update({
        addressGeo: viewer?.addressGeo,
        coords: viewer?.coords
      });
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
const flagToken = async (
  _: undefined,
  __: undefined,
  { genRandomFlagUrl, nanoid }: { genRandomFlagUrl: () => string; nanoid: (arg: number) => string }
): Promise<FlagTokenOutput | undefined> => {
  try {
    const token = nanoid(11);
    const flag = await genRandomFlagUrl();

    console.log(flag, token);
    return { success: true, flag, token };
  } catch (error) {
    return { flag: '', token: '', success: false };
  }
};
const profileEnrollments = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, moment }: { dbFirestore: Firestore; moment: (arg: string) => { add: (arg: string) => string } }
): Promise<{ success: boolean; message: string } | undefined> => {
  const dbGuests = dbFirestore.collection('guests');

  const guestRef = await dbGuests.doc(`${id}`);

  return guestRef
    .get()
    .then(async (guestSnapshot: unknown) => {
      if (guestSnapshot?.exists) {
        console.log({ data: guestSnapshot.data() });
        return { success: true, message: JSON.stringify(guestSnapshot.data()) };
      } else {
        return { success: true, message: 'GUEST DONT EXIST' };
      }
    })
    .catch((error) => {
      return { success: false, message: JSON.stringify(error) };
    });
};
const organisatorLiisilById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean; liisil: FrontConnexionType[] | [] | string } | undefined> => {
  try {
    const profileSnapshot = await dbFirestore.collection('profiles').doc(id).collection('LIISIL').get();

    const liisil: FrontConnexionType[] = [];
    //console.log({ profileSnapshot })

    profileSnapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const connexion = await doc?.data()!;
      liisil.push(connexion as FrontConnexionType);
    });
    return { success: true, liisil };
  } catch (error) {
    return { success: false, liisil: JSON.stringify(error) };
  }
};

const organisatorLibraryById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, moment }: { dbFirestore: Firestore; moment: (arg: string) => { add: (arg: string) => string } }
): Promise<{ success: boolean; library: FrontConnexionType[] | [] | string } | undefined> => {
  try {
    const librarySnapshot = await dbFirestore.collection('profiles').doc(id).collection('LIBRARY').get();
    const library: FrontConnexionType[] = [];

    librarySnapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const connexion = await doc?.data()!;
      //      console.log({ connexion })
      library.push(connexion as FrontConnexionType);
    });
    return { success: true, library };
  } catch (error) {
    return { success: false, library: JSON.stringify(error) };
  }
};
const collaboratorDiscountById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, moment }: { dbFirestore: Firestore; moment: (arg: string) => { add: (arg: string) => string } }
): Promise<{ success: boolean; discount: FrontConnexionType[] | [] | string } | undefined> => {
  try {
    const discountSnapshot = await dbFirestore.collection('profiles').doc(id).collection(PROFILE_STATUS_ENUM.DISCOUNT).get();
    const discount: FrontConnexionType[] = [];

    discountSnapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const connexion = await doc?.data()!;
      //      console.log({ connexion })
      discount.push(connexion as FrontConnexionType);
    });
    return { success: true, discount };
  } catch (error) {
    return { success: false, discount: JSON.stringify(error) };
  }
};

const collaboratorDeliveryById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, moment }: { dbFirestore: Firestore; moment: (arg: string) => { add: (arg: string) => string } }
): Promise<{ success: boolean; delivery: FrontConnexionType[] | [] | string } | undefined> => {
  try {
    const deliverySnapshot = await dbFirestore.collection('profiles').doc(id).collection(PROFILE_STATUS_ENUM.DELIVER).get();
    const delivery: FrontConnexionType[] = [];

    deliverySnapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const connexion = await doc?.data()!;
      //      console.log({ connexion })
      delivery.push(connexion as FrontConnexionType);
    });
    return { success: true, delivery };
  } catch (error) {
    return { success: false, delivery: JSON.stringify(error) };
  }
};
const adminCollaboratorById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, moment }: { dbFirestore: Firestore; moment: (arg: string) => { add: (arg: string) => string } }
): Promise<{ success: boolean; adminCollaborator: FrontConnexionType[] | [] | string } | undefined> => {
  try {
    const adminCollaboratorSnapshot = await dbFirestore.collection('profiles').doc(id).collection(PROFILE_STATUS_ENUM.COLL).get();
    const adminCollaborator: FrontConnexionType[] = [];

    adminCollaboratorSnapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const connexion = await doc?.data()!;
      //      console.log({ connexion })
      adminCollaborator.push(connexion as FrontConnexionType);
    });
    return { success: true, adminCollaborator };
  } catch (error) {
    return { success: false, adminCollaborator: JSON.stringify(error) };
  }
};

const adminOrganisatorById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore, moment }: { dbFirestore: Firestore; moment: (arg: string) => { add: (arg: string) => string } }
): Promise<{ success: boolean; adminOrganisator: FrontConnexionType[] | [] | string } | undefined> => {
  try {
    const adminOrganisatorSnapshot = await dbFirestore.collection('profiles').doc(id).collection(PROFILE_STATUS_ENUM.ORGA).get();
    const adminOrganisator: FrontConnexionType[] = [];

    adminOrganisatorSnapshot.forEach(async (doc: DocumentSnapshot<ProfileTypeData | DocumentData>) => {
      const connexion = await doc?.data()!;
      //      console.log({ connexion })
      adminOrganisator.push(connexion as FrontConnexionType);
    });
    return { success: true, adminOrganisator };
  } catch (error) {
    return { success: false, adminOrganisator: JSON.stringify(error) };
  }
};

const addStatus = async (
  _: undefined,
  { input }: { input: AddStatusInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<AddStatusOutput | undefined> => {
  const { flag, token, id, title } = input;
  console.log({ input });
  try {
    await dbFirestore
      .collection('profiles')
      .doc(id)
      .update({
        status: { ...input }
      });
    return { success: true, token: token, flag: flag, title };
  } catch (error) {
    if (error instanceof Error) {
      throw `${error.message} occurs`;
    }
    throw new Error(error);
  }
};
const signOut = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean } | undefined> => {
  try {
    await dbFirestore.collection('profiles').doc(`${id}`).update({
      online: false
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw `${error.message} occurs`;
    }
    throw new Error(error);
  }
};
const addFavoriteConnections = async (
  _: undefined,
  { input }: { input: AddFavoriteConnectionsInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean } | undefined> => {
  const { id, token, flag, status, profileEmail, profileId, title } = input;
  console.log({ input });
  try {
    dbFirestore
      .collection('profiles')
      .doc(id)
      .update({
        favoriteConnection: { token, flag, status, profileEmail, profileId, title }
      })
      .then((doc) => {
        console.log({ doc });
        return { success: true };
      });
  } catch (error: any) {
    throw new Error(error);
  }

  const profileRef = await dbFirestore.collection('profiles').doc(id);
  return profileRef
    .get()
    .then((profileSnapshot: unknown) => {
      if (profileSnapshot.exists) {
        /*   console.log(profileSnapshot.data()) */
        return profileSnapshot.data();
      } else {
        throw new Error();
      }
    })
    .catch((error: any) => {
      console.log({ errorProfileResolver: error });
      throw new Error(error);
    });
};
const Profile = {
  _id: async (profile: ProfileTypeData): Promise<unknown> => {
    try {
      // console.log({ currentUserUpdatePrublic: currentUser });
      const { _id } = profile;
      //const { login, role, organisation, photos = ['https://via.placeholder.com/200'] } = input;
      return _id;
    } catch (error: any) {
      // console.error(error);
      throw new Error(error);
    }
  }
};

module.exports = {
  Profile,
  Query: {
    profile,
    profiles,
    guests,
    getEmailVerified,
    flagToken,
    profileEnrollments,
    organisatorLiisilById,
    organisatorLibraryById,
    collaboratorDiscountById,
    collaboratorDeliveryById,
    adminCollaboratorById,
    adminOrganisatorById,
    signOut
  },
  Mutation: {
    addProfile,
    updateProfile,
    setEmailVerified,
    updateProductsCarts,

    updateAddress,
    updateProfileAddressGeoCoords,

    sendMessage,
    removeMessage,
    removeProfile,
    promote,

    addStatus,
    addFavoriteConnections,
    copyFromViewer
  }
};

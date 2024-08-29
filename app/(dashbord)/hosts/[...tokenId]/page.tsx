import HostGeoForm from "@/components/hosts/HostGeoForm";


export default function HostsPage() {

    return (
        <div className="flex border-2 h-full w-full p-3  border-violet-500  justify-center items-start gap-3 flex-wrap">
            <HostGeoForm />
        </div>
    );
}

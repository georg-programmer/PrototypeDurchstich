import {User} from "@/app/generated/prisma/client"

import Button from "./Button";

interface Props {
    action: (formData: FormData) => void | Promise<void>;
    user?: User;//TODO: Optionale mitgabe von usern, damit form bei edit mit daten gefüllt werden kann.
}

const UserForm = ({ action, user }: Props) => {
    return <form action={action} className="flex flex-col gap-y-0.25 max-w-">
        <div className="flex flex-col gap-y-0.125 bg-accent rounded-md p-0.25 ">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                defaultValue={user ? user.name ?? "" : ""}
                className="bg-gray-200 border-3 border-main rounded-sm focus:border-4"
                required />
        </div>

        <div className="flex flex-col gap-y-0.125 bg-accent rounded-md p-0.25 ">
            <label htmlFor="geburtstag">Birthday</label>
            <input
                id="geburtstag"
                name="geburtstag"
                type="date"
                defaultValue={user?.geburtstag ? new Date(user.geburtstag).toISOString().split("T")[0] : ""}
                className="bg-gray-200 border-3 border-main rounded-sm focus:border-4"
                required />
        </div>

        <div className="flex gap-y-0.125 gap-x-0.25 bg-accent rounded-md p-0.25 ">
            <input
                id="istVergeben"
                name="istVergeben"
                defaultChecked={user?.istVergeben ?? false}
                type="checkbox"
                className="bg-gray-200 border-3 border-main rounded-sm accent-main focus:border-4" />
            <label htmlFor="istVergeben">Has a Relationship</label>
        </div>

        <Button type="submit" className="w-fit">{user ? "Edit User" : "Add User"}</Button>
    </form>;
}

export default UserForm;
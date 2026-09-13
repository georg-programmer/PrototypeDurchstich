interface Props {
    action: (formData: FormData) => void | Promise<void>;
    //TODO: Optionale mitgabe von usern, damit form bei edit mit daten gefüllt werden kann.
}

const UserForm = ({ action }: Props) => {
    return <form action={action} className="flex flex-col gap-y-1">
        <div className="flex flex-col gap-y-0.5 bg-accent rounded-md p-1 ">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                className="bg-gray-200 border-3 border-main rounded-sm focus:border-4"
                required />
        </div>

        <div className="flex flex-col gap-y-0.5 bg-accent rounded-md p-1 ">
            <label htmlFor="email">E-Mail</label>
            <input
                id="email"
                name="email"
                type="text"
                className="bg-gray-200 border-3 border-main rounded-sm focus:border-4"
                required />
        </div>

        <div className="flex flex-col gap-y-0.5 bg-accent rounded-md p-1 ">
            <label htmlFor="geburtstag">Geburtstag</label>
            <input
                id="geburtstag"
                name="geburtstag"
                type="date"
                className="bg-gray-200 border-3 border-main rounded-sm focus:border-4"
                required />
        </div>

        <div className="flex gap-y-0.5 gap-x-1 bg-accent rounded-md p-1 ">
            <input
                id="istVergeben"
                name="istVergeben"
                type="checkbox"
                className="bg-gray-200 border-3 border-main rounded-sm accent-main focus:border-4" />
            <label htmlFor="istVergeben">Ist vergeben</label>
        </div>

        <button type="submit" className="w-fit">
            Benutzer hinzufügen
        </button>
    </form>;
}

export default UserForm;
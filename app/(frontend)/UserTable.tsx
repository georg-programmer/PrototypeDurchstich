import Button from "./Button";

export interface Props {
    users: object[];
}

const UserTable = ({ users }: Props) => {
    return <div className="overflow-x-scroll">
        <table className="min-w-full overflow-hidden rounded-lg text-left text-sm text-gray-900 ">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700">
                <tr>
                    <th></th>
                    {users.length > 0 && Object.keys(users[0]).map((key) => (
                        <th key={key} scope="col" className="px-6 py-3 font-semibold">
                            {key}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id ?? index} className="odd:bg-white even:bg-gray-100">
                        <td>
                            <Button link={`/edit/${user.id ?? index}`}>Edit</Button>
                        </td>
                        {Object.entries(user).map(([key, value]) => (
                            <td key={key} className="whitespace-nowrap px-6 py-4">
                                {typeof value === "object" && value !== null
                                    ? JSON.stringify(value)
                                    : String(value ?? "")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default UserTable;
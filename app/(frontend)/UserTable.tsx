import type { User } from "@/app/generated/prisma/client";
import Button from "./Button";

const headerLabels: Record<string, string> = {
    geburtstag: "Birthday",
    istVergeben: "In a Relationship",
};

export interface Props {
    users: User[];
    onDelete?: (id: number) => void | Promise<void>;
}

const UserTable = ({ users, onDelete }: Props) => {
    return <div className="overflow-x-scroll">
        <table className="min-w-full overflow-hidden rounded-lg text-left text-sm text-gray-900 ">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700">
                <tr>
                    <th></th>
                    {users.length > 0 && Object.keys(users[0]).map((key) => (
                        <th key={key} scope="col" className="px-1.5 py-0.75 font-semibold">
                            {headerLabels[key] ?? key}
                        </th>
                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user?.id ?? index} className="odd:bg-white even:bg-gray-100">
                        <td>
                            <Button link={`/edit/${user.id ?? index}`}>Edit</Button>
                        </td>
                        {Object.entries(user).map(([key, value]) => (
                            <td key={key} className="whitespace-nowrap px-1.5 py-1">
                                {value instanceof Date
                                    ? value.toLocaleDateString()
                                    : typeof value === "object" && value !== null
                                        ? JSON.stringify(value)
                                        : String(value ?? "")}
                            </td>
                        ))}
                        {onDelete && (
                            <td>
                                <form action={onDelete.bind(null, user.id)}>
                                    <Button type="submit" className="bg-red-600 hover:bg-red-700">Delete</Button>
                                </form>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default UserTable;
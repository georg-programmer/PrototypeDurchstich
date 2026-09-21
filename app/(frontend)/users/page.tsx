
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAllUsers, deleteuser } from "@/app/services/user.service";
import UserTable from "../UserTable";
import Header from "../Header";
import Button from "../Button";

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const IndexPage = async () => {

    const users  = await getAllUsers();

    async function handleDelete(id: number) {
        "use server";
        await deleteuser(id);
        revalidatePath("/users");
        redirect("/users");
    }

	return  (
        <>
            <Header>All Users</Header>
            <Button link="/users/add">Add User</Button>
            <div className="h-0.5"/>
            <UserTable users={users} onDelete={handleDelete} />
        </>
    );
};

export default IndexPage;




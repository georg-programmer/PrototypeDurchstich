
import { getAllUsers } from "@/app/services/user.service";
import UserTable from "../UserTable";
import Header from "../Header";
import Button from "../Button";

const IndexPage = async () => {

    const users  = await getAllUsers();

	return  (
        <>
            <Header>All Users</Header>
            <Button link="/users/add">Add User</Button>
            <div className="h-0.5"/>
            <UserTable users= {users}></UserTable>
        </>
    );
};

export default IndexPage;




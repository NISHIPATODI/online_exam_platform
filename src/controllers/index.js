const UserAuthController=require("./authentication/authControllers");
const adminController=require("./admin/adminControllers");
const studentController=require("./student/studentControl");
const testController=require("./test/testController");

//const UserSearchController=require("./users/UserSearch");
//const HostLocations=require("./hosts/hostLocations");


module.exports={
    UserAuthController,
    adminController,
    studentController,
    testController
   // UserSearchController,
    //HostLocations
}
import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import OrderPage from "../pages/books/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook.jsx";
import About from "../components/About.jsx"
import Mpesa from "../components/Mpesa.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderPage/></PrivateRoute>
            },
            {
                path: "/about",
                element: <About/>
            },
              {
                path: "/mpesa",
                element: <Mpesa/>
            },
            {
                path:"/login",
                element:<Login/>
            },
             {
                path:"/register",
                element:<Register/>
            },
             {
                path:"/cart",
                element:<CartPage/>
            },
            
             {
                path:"/checkout",
                element:<PrivateRoute><CheckoutPage/></PrivateRoute>
            },
            {
                path: "/books/:id",
                element: <SingleBook/>
            },
            {
                 path: "/admin",
                 element: <AdminLogin/>
            },
            {
                path: "/dashboard",
                element: <AdminRoute><DashboardLayout/> </AdminRoute>,
            
                children:[
                    {
                path: "",
                element: <AdminRoute><Dashboard/></AdminRoute>,
                    },
                    {
                path: "add-new-book",
                element: <AdminRoute><AddBook/></AdminRoute>,
                    },
                    {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook/></AdminRoute>,
                    },
                    {
                path: "manage-books",
                element: <AdminRoute><ManageBooks/></AdminRoute>,
                    }
                ]
            }
        ]
    },
]);

export default router;

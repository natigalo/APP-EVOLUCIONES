import { createBrowserRouter } from 'react-router-dom'
import Main from './layouts/Main'
import App from './App.jsx'
import Home from './pages/Home.jsx'
/* import Admin from './layouts/Admin'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Shop from './pages/Shop'
import Panel from './pages/Panel'
import AdminProducts from './pages/AdminProducts'
import AdminCategories from './pages/AdminCategories'
import AdminCreators from './pages/AdminCreators'
import Cart from './pages/Cart'
import Details from './pages/Details'
import BeSeller from './pages/BeSeller'
import SellerProducts from './pages/SellerProducts'
import Orders from './pages/Orders'
import CreatorPanel from './pages/CreatorPanel'
import Creator from './layouts/Creator';
import CreatorOrders from './pages/CreatorOrders'
import PaymentForm from './pages/PaymentForm'
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
           
            
        ]
    },
  /*   { path: '/signin', element: <Signin /> },
    { path: '/signup', element: <Signup /> },
    { path: '/seller-form', element: <BeSeller /> },
    { path: '/payment', element: <PaymentForm />},
    {
        path: '/',
        element: <Admin />,
        children: [
            { path: '/panel', element: <Panel /> },
            { path: '/admincreators', element: <AdminCreators /> },
            { path: '/adminproducts/:page', element: <AdminProducts /> },
            { path: '/admincategories', element: <AdminCategories /> },
            
        ]
    },
    {
        path: '/',
        element: <Creator />,
        children: [
            { path: '/creatorPanel', element: <CreatorPanel /> },
            { path: '/ordersCreator', element: <CreatorOrders /> },
            { path: '/seller-products', element: <SellerProducts />},   
        ]
    } */
])

export default router
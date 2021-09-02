import { Box } from "@chakra-ui/react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Checkout from "./component/checkout/Checkout"
import Home from "./component/home/Home"
import LoginPage from "./component/login/LoginPage"
import SignUpPage from "./component/login/SignUpPage"
import ProfilePage from "./component/profile/ProfilePage"
import Error404Page from "./component/shared/Error404Page"
import MainAppBar from "./component/shared/MainAppBar"
import StorePage from "./component/store/StorePage"
import Intergrate from "./component/test/Intergrate"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Box height='100%' display='flex' flexDirection='column'>
                <MainAppBar />
                <Box height='100%'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/login'>
                            <LoginPage />
                        </Route>
                        <Route exact path='/signup'>
                            <SignUpPage />
                        </Route>
                        <Route exact path='/stores/:id'>
                            <StorePage />
                        </Route>
                        <Route exact path='/checkout'>
                            <Checkout />
                        </Route>
                        <Route exact path='/stores/:id/checkout'>
                            <Checkout />
                        </Route>
                        <Route exact path='/profile'>
                            <ProfilePage />
                        </Route>
                        {/* This is test */}
                        <Route exact path='/test'>
                            <Intergrate />
                        </Route>
                        <Route>
                            <Error404Page />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    )
}
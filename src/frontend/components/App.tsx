import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Avatar } from "@mui/material"
import { ethers } from "ethers"
import MusicNFTMarketplaceAbi from "../contractsData/MusicNFTs.json"
import MusicNFTMarketplaceAddress from "../contractsData/MusicNFTs-address.json"
import { Spinner, Navbar, Nav, Container } from "react-bootstrap"
import icon from "./icon.png"
import Home from "./Home"
import "./App.css"

function App() {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState("")
    const [contract, setContract] = useState({})

    // use effect to handle refresh
    // useEffect(() => {
    //     // console.log(account)
    //     if (account) {
    //         return
    //     } else {
    //         if (localStorage.getItem("account") != "undefined") {
    //             const storedAccount = localStorage.getItem("account")
    //             if (storedAccount) {
    //                 setAccount(storedAccount)
    //                 setLoading(false)
    //                 // console.log(contract)
    //             }
    //         }
    //     }
    // }, [account])

    //use effect to handle change accounts

    const web3Handler = async () => {
        if (window.ethereum) {
            //@ts-ignore
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            setAccount(accounts[0])
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            loadContract(signer)
        }
    }
    const logOutHandler = async () => {
        setAccount("")
        setContract({})
        // localStorage.removeItem("account")
    }
    const loadContract = async (signer: ethers.providers.JsonRpcSigner) => {
        const contract = new ethers.Contract(
            MusicNFTMarketplaceAddress.address,
            MusicNFTMarketplaceAbi,
            signer
        )
        setContract(contract)
        setLoading(false)
    }
    return (
        // <ThemeProvider>
        <BrowserRouter>
            <div className="App">
                <>
                    <Navbar expand="lg" bg="secondary" variant="dark">
                        <Container>
                            <Navbar.Brand href="http://www.wontaeo.com">
                                <Avatar alt="WON TAEO" src={icon} sx={{ width: 56, height: 56 }} />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">
                                        Music
                                    </Nav.Link>
                                </Nav>
                                <Nav>
                                    {account ? (
                                        <Button
                                            onClick={logOutHandler}
                                            variant="contained"
                                            color="success"
                                        >
                                            {account.slice(0, 5) + "..." + account.slice(38, 42)}
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={web3Handler}
                                            variant="contained"
                                            color="info"
                                        >
                                            Connect Wallet
                                        </Button>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </>
                <div>
                    {loading ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "80vh",
                            }}
                        >
                            <Spinner animation="border" style={{ display: "flex" }} />
                            <p className="mx-3 my-0">Awaiting Wallet Connection...</p>
                        </div>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Home contract={contract} />} />
                        </Routes>
                    )}
                </div>
            </div>
        </BrowserRouter>
        // </ThemeProvider>
    )
}

export default App

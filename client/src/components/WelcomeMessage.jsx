const WelcomeMessage = ({walletConnected,message}) =>{
    return (
        <center style={{
            margin: "100px 0",
            alignContent: "center",
            alignItems: "center",
            color: "rgb(104,151,179)"
        }}>
            {walletConnected ? <h1>Register to show your Properties</h1> : <h1>Connect Wallet to show your Properties</h1>}
        </center>
    )
}

export default WelcomeMessage;
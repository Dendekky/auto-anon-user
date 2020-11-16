
const AnonUser = (req, res) => {
    if(req.session && req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times." + "Your session ID is " + req.sessionID);
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
}

export default AnonUser
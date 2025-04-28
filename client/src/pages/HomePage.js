import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    const handleSignUp = () => navigate('/signup');
    const handleSignIn = () => navigate('/signin');
    const handleItemList = () => navigate('/itemlist');
    const handleNewPost = () => navigate('/newpost');
    const handleUserProfile = () => navigate(`/userprofile/123`); //

    return (
        <div className="app" role="main">
            <header className="header" role="banner">
                <h1 className="logo" aria-label="Weiter">
                    <a href="/" tabIndex="0" aria-current="page">Weiter</a>
                </h1>                
                <nav className="auth-buttons" aria-label="navigation">
                    <button className="btn btn-signin" onClick={handleSignIn} aria-label="Sign in to your account" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}>Sign In</button>
                    <button className="btn btn-signup" onClick={handleSignUp} aria-label="Create new account" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}>Sign Up</button>
                    <button className="btn btn-itemlist" hidden={true} onClick={handleItemList} aria-label="View all posts" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && handleItemList()}>View Posts</button>
                    <button className="btn btn-newpost" hidden={true} onClick={handleNewPost} aria-label="Create new post" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && handleNewPost()}>New Post</button>
                    <button className="btn btn-userprofile" hidden={true} onClick={handleUserProfile} aria-label="View your profile" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && handleUserProfile()}>User Profile</button>
                </nav>
            </header>
            <main className="main-content" id="main-content">
                <h2 tabIndex="0">Welcome to Weiter</h2>
                <img src="/Weiter.png" alt="logo icon"  aria-hidden="true"/>
                <p className="slogan" tabIndex="0"aria-label="Our motto: Your Voice, Your Story">
                    Your Voice, Your Story.
                </p> 

            </main>
        </div>
    );
}

export default HomePage;
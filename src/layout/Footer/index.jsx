import './index.css';

const Footer = () => {
    return (
        <footer className='welcome-footer'>
            <div className="welcome-footer-centered">
                <div className="welcome-footer-padded">
                    <div className="welcome-footer-row-block welcome-footer--row-2">
                        <div className="welcome-footer-row-2-text">Hello, Slack fans! Very pleased to meet you! There's no need to create an account. Just add our extension and off you go!</div>
                        <a href="https://slack.com/oauth/authorize?client_id=116888949298.122751011265&amp;scope=bot,commands"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/welcome_page/slack.png" alt='' /></a>
                    </div>
                    <div className="welcome-footer-row-block welcome-footer--row-1">
                        <div className="welcome-footer-row-1-text">Jitsi on mobile – download our apps and start a meeting from anywhere </div>
                        <a className="welcome-badge" href="https://apps.apple.com/us/app/jitsi-meet/id1165103905"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/app-store-badge.png" alt='3123' /></a>
                        <a className="welcome-badge" href="https://play.google.com/store/apps/details?id=org.jitsi.meet&amp;hl=en&amp;gl=US"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/google-play-badge.png" alt='' /></a>
                        <a className="welcomebadge" href="https://f-droid.org/en/packages/org.jitsi.meet/"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/f-droid-badge.png" alt='' /></a>
                    </div>

                    <div className="welcome-footer-row-block welcome-footer--row-3">
                        <div>
                            <a className="welcome-footer-link" href="https://jitsi.org/meet-jit-si-privacy/">Privacy Policy </a>
                            <a className="welcome-footer-link" href="http://jitsi.org/meet-jit-si-terms-of-service/">Terms &amp; Conditions</a>
                        </div>
                        <div>
                            <a className="welcome-page-sm" href="https://www.facebook.com/jitsi"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/welcome_page/fb.png" alt='' /></a>
                            <a className="welcome-page-sm" href="https://www.linkedin.com/company/8x8/"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/welcome_page/li.png" alt='' /></a>
                            <a className="welcome-page-sm" href="https://twitter.com/jitsinews"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/welcome_page/tw.png" alt='' /></a>
                            <a className="welcome-page-sm" href="https://github.com/jitsi"><img src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/welcome_page/gh.png" alt='' /></a>
                        </div>
                    </div>
                    <div className="welcome-footer-row-block welcome-footer--row-4">
                        <a href="https://8x8.com"><img className="logo-8x8" src="https://web-cdn.jitsi.net/meetjitsi_6597.3352/images/welcome_page/8x8-logo.png" alt='' /></a>
                        <div className="welcome-footer-row-4-text">
                            <div>8x8 is a proud supporter of the Jitsi community.</div>
                            <div>© 8x8, Inc. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;

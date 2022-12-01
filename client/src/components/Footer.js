import React from 'react';

const Footer = () => {
    return (
        <section className='footer'>
            <hr className='footer-seperator' />
            <section className='footer-info'>
                {/* Left */}
                <section className='footer-info-left'>
                    <section className='footer-info-name'>
                        Explore
                    </section>
                    <section className='footer-info-returns'> 
                        Blog
                        <section className='footer-info-returns'>
                            Community
                        </section>
                    </section>
                </section>
                {/* Center */}
                <section className='footer-info-center'>
                    <section className='footer-info-general'>
                        General
                    </section>
                    <section className='footer-info-terms'>
                        About
                        <section className='footer-info-terms'>
                            Team
                        </section>
                    </section>
                </section>
                {/* Right */}
                <section className='footer-info-right'>
                    <section className='footer-info-number'>
                        Support
                    </section>
                    <section className='footer-info-contact'>
                        FAQ
                        <section className='footer-info-contact'>
                            Contact Us
                        </section>
                    </section>
                </section>
            </section>
            {/* <hr className='footer-seperator' /> */}
        </section>
    )
}

export default Footer;
import React from 'react'
import '../css/login.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

function SocialLink() {
    return (
        <div className="social-icons">
            <a href="https://www.facebook.com/kou92official" target="_blank" rel="noopener noreferrer">
                <FacebookIcon fontSize="small" />
            </a>
            <a href="https://www.instagram.com/kou92official/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon fontSize="small" />
            </a>
            <a href="https://x.com/kou92official" target="_blank" rel="noopener noreferrer">
                <XIcon fontSize="small" />
            </a>
            <a href="https://www.youtube.com/c/kocaeli%C3%BCniversitesi" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon fontSize="small" />
            </a>
        </div>
    )
}

export default SocialLink
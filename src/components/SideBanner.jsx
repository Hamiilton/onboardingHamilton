import React from "react";
import '../styles/SideBanner.css';

export default function SideBanner({title, subtitle,text,linkIntro,linkText,linkHref}){
    return(
        <div className="side-banner">
            <div className="banner-text">
                <h2 className="banner-title">{title}</h2>
                <p className="banner-subtitle">{subtitle}</p>
                <p className="banner-link-text">
                {text}<br />
                {linkIntro} <a className="banner-link" href={linkHref}>{linkText}</a>
                </p>

            </div>
            <img className="banner-image" src="/img/illustration-2-transparent.png" alt="Bienvenida"></img>
        </div>
    )
}
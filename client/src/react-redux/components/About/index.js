import React from 'react';
import { Container } from 'react-bootstrap';
import './index.css';
import Typewriter from 'typewriter-effect'


export default function About() {
    return (
        
        <Container className="d-flex flex-wrap">
                <div className="d-flex flex-row my-2 justify-content-between align-items-center">
            <h4 className="display-6 my-4">
                Ever wonder what other people's<br /> opinions of your favorite<Typewriter options={{
                    strings: ['brands', 'movies', 'sports teams', 'stocks', 'books', 'politicians', 'businesses', 'tv shows' ],
                    autoStart: true,
                    loop: true
                }} /> are?
            </h4>
                <img src="/backgroundGraph.png" alt="..." className="aboutPageGraph"/>
            </div>
            <span className="mx-3">
                <p>
                <i>LamentID</i> is a service that allows users to track their favorite brands, competitions, stocks, sports teams... the options are endless.
                Scanning through thousands of comments on any subreddit on reddit.com, <i>LamentID</i> provides data regarding the general sentiment of anything you can think of.</p>
                <p>Thinking about purchasing a new car? Allow <i>LamentID</i> to give you real people's opinions on your future purchases.
                Thinking about investing? <i>LamentID</i> can show you other people's thoughts on the market and stocks. Make your money count.</p>
                <p><i>LamentID</i> only searches for a user's keywords in real time, so you only get the most recent comments. With a constantly running background program, users receive the data they want within a matter of seconds. <i>LamentID</i> is full-time scanning user's selected subreddits for their keywords. <i>LamentID</i> reads each comment that is returned with each data fetch and looks for keywords included in our sentimentality library. It scores each comment on a scale of -10 to 10 and graphs that point on the charting software. 
                Using Chart.js, a real time graphing library, <i>LamentID</i> updates your data every minute. Watch your data come to life on their innovative charting technology.</p>
            </span>
        </Container>
    )
}

import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import "./index.css"
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'


export default function LandingCarousel() {
    const variants = {
        hidden: {
            opacity: 0,
            x: 100,
            y: 100,
        },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {


                duration: 3,

                staggerChildren: 0.5
            }
        }
    }
    return (
        <Container className="homepage">
                <div className="trackyour">
                    <h1 className="display-5 track"><Typewriter options={{
                        strings: ['Track Your:'],
                        autoStart: true,
                        pauseFor: 50000
                        }} />
                    </h1>
                </div>


            <motion.div
                variants={variants}
                initial="hidden"
                animate="show"
                className="bigdivstyle">
                <Row className="bpf">
                    <Col><Card.Text className="cardText">Brand</Card.Text><motion.img variants={variants} src="/swoosh.png" alt=""></motion.img></Col>
                    <Col><Card.Text>Product</Card.Text><motion.img variants={variants} src="/af1.jpg" alt=""></motion.img></Col>
                    <Col><Card.Text>Future Purchase</Card.Text><motion.img variants={variants} src="/corvette.jpg" alt=""></motion.img></Col>
                </Row>
                <Row className="software">
                    <Card.Text>With our sentiment tracking software:</Card.Text>
                    <motion.img variants={variants} src="/dummygraph.png" alt=""></motion.img>
                </Row>

            </motion.div>
        </Container>
    )

}

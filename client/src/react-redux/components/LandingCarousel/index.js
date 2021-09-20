import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import "./index.css"
import { motion } from 'framer-motion'

export default function LandingCarousel() {

    return (
        <Container>
            <motion.div
                initial={{
                    opacity: 0,
                    x: 100, 
                    y: 100,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                }}
                transition={{
                    duration: 5
                }}
                className="bigdivstyle">
                <Card className="trackyour w-25">
                    <Card.Body>Track Your:</Card.Body>
                </Card>
           
           
                <Row>       
                    <Col>
                    <Card.Text>Brand</Card.Text><img src="/swoosh.png" alt=""></img></Col>
                    <Col><Card.Text>Product</Card.Text><img src="/af1.jpg" alt=""></img></Col>
                    <Col><Card.Text>Future Purchase</Card.Text><img src="/corvette.jpg" alt=""></img></Col>       
                </Row>
                </motion.div>
        </Container>
    )

}

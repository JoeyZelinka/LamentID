import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import "./index.css"
import { motion } from 'framer-motion'


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
        <Container>
            <motion.div
                variants={variants}
                initial="hidden"
                animate="show"
                className="bigdivstyle">
                <Card className="trackyour w-25">
                    <Card.Body>Track Your:</Card.Body>
                </Card>


                <Row className="bpf">
                    <Col><Card.Text>Brand</Card.Text><motion.img variants={variants} src="/swoosh.png" alt=""></motion.img></Col>
                    <Col><Card.Text>Product</Card.Text><motion.img variants={variants} src="/af1.jpg" alt=""></motion.img></Col>
                    <Col><Card.Text>Future Purchase</Card.Text><motion.img variants={variants} src="/corvette.jpg" alt=""></motion.img></Col>
                </Row>
                <Col className="software">
                    <Row><Card.Text>With our sentiment tracking software:</Card.Text></Row>
                    <Row><Col><motion.img variants={variants} src="/dummygraph.png" alt=""></motion.img></Col></Row>
                </Col>

            </motion.div>
        </Container>
    )

}

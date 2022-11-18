import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import { ChecklistProps } from "../../Utils/tscTypes";
import { getUserCategoryDetails, updateCategoryClickHandler } from "../../Functions/serverFunctions";

import useUserStore from "../../store";

import "./Checklist.css";

const Checklist: React.FC<ChecklistProps> = (props) => {
    let navigate = useNavigate();

    const [news, setNews] = useState<boolean>();
    const [president, setPresident] = useState<boolean>();
    const [niti, setNiti] = useState<boolean>();
    const [idsa, setIdsa] = useState<boolean>();
    const [pib, setPib] = useState<boolean>();
    const [prs, setPrs] = useState<boolean>();

    const { logoutUser, categoryDetail, setCategoryDetail } = useUserStore((state) => state);

    useEffect(() => {
        getUserCategoryDetails(setNews, setPresident, setNiti, setIdsa, setPib, setPrs, setCategoryDetail, categoryDetail, props.show, navigate, logoutUser);
    }, [JSON.stringify(categoryDetail), props.show]);

    return (
        <div className="Parent">
            <h3 className="Text">Select the sites for which you want to receive notification</h3>
            <Form className="Lists">
                <div className="ListParent">
                    <div>News on air</div>
                    <Form.Check aria-label="option 1" checked={news} onChange={(e) => setNews(!news)} />
                </div>

                <div className="ListParent">
                    <div>President of India</div>
                    <Form.Check aria-label="option 1" checked={president} onChange={(e) => setPresident(!president)} />
                </div>

                <div className="ListParent">
                    <div>Niti Aayog</div>
                    <Form.Check aria-label="option 1" checked={niti} onChange={(e) => setNiti(!niti)} />
                </div>

                <div className="ListParent">
                    <div>Institute for Defence studies and Analysis</div>
                    <Form.Check aria-label="option 1" checked={idsa} onChange={(e) => setIdsa(!idsa)} />
                </div>

                <div className="ListParent">
                    <div>Press Information Bureau</div>
                    <Form.Check aria-label="option 1" checked={pib} onChange={(e) => setPib(!pib)} />
                </div>
                <div className="ListParent">
                    <div>PRS India</div>
                    <Form.Check aria-label="option 1" checked={prs} onChange={(e) => setPrs(!prs)} />
                </div>
            </Form>
            <Button
                variant="primary"
                className="ListButton"
                onClick={() => {
                    updateCategoryClickHandler(news, president, niti, idsa, pib, prs, setCategoryDetail, navigate, logoutUser);
                    props.removeModal();
                }}
            >
                Update Categories
            </Button>
        </div>
    );
};

export default Checklist;

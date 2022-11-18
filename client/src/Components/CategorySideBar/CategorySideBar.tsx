import React from "react";
import { Link, NavLink } from "react-router-dom";

import { CategorySideBarProps } from "../../Utils/tscTypes";

import "./CategorySideBar.css";

const CategorySideBar: React.FC<CategorySideBarProps> = (props) => {
    return (
        <div className="NewSidebarParent">
            {props.categoryNew.news ? (
                <section>
                    <p className="SectionHeader">• News on air</p>
                    <ul className="NewSidebarList">
                        <Link to="/newsOnAir_National" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">National</li>
                        </Link>
                        <Link to="/newsOnAir_International" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">International</li>
                        </Link>
                        <Link to="/newsOnAir_Business" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Business</li>
                        </Link>
                        <Link to="/newsOnAir_Sports" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Sports</li>
                        </Link>
                    </ul>
                </section>
            ) : null}

            {props.categoryNew.president ? (
                <section>
                    <p className="SectionHeader">• President of India</p>
                    <ul className="NewSidebarList">
                        <Link to="/poi_Speeches" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Speeches</li>
                        </Link>
                        <Link to="/poi_pressReleases" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Press releases</li>
                        </Link>
                    </ul>
                </section>
            ) : null}

            {props.categoryNew.niti ? (
                <section>
                    <p className="SectionHeader">• Niti Aayog</p>
                    <ul className="NewSidebarList">
                        <Link to="/nitiAayog_nitiBlogs" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Niti blogs</li>
                        </Link>
                    </ul>
                </section>
            ) : null}

            {props.categoryNew.idsa ? (
                <section>
                    <p className="SectionHeader">• Institute for Defence Studies and Analysis</p>
                    <ul className="NewSidebarList">
                        <Link to="/idsa_commentsAndBriefs" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Comments and briefs</li>
                        </Link>
                    </ul>
                </section>
            ) : null}

            {props.categoryNew.pib ? (
                <section>
                    <p className="SectionHeader">• Press Information Bureau</p>
                    <ul className="NewSidebarList">
                        <Link to="/pib_pressReleases" style={{ textDecoration: "none" }}>
                            <li className="NewSidebarListItem">Press releases</li>
                        </Link>
                    </ul>
                </section>
            ) : null}

            {props.categoryNew.prs ? (
                <section>
                    <p className="SectionHeader">• PRS India</p>
                    <ul className="NewSidebarList">
                        <Link to="/prs_Blogs" style={{ textDecoration: "none" }}>
                            <li>Blogs</li>
                        </Link>
                        <NavLink to="/prs_Articles" style={{ textDecoration: "none" }}>
                            <li>Articles</li>
                        </NavLink>
                    </ul>
                </section>
            ) : null}
        </div>
    );
};

export default CategorySideBar;

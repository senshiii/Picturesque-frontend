import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import classes from './Home.module.css';

const Home = (props) => {
	const [ images, setImages ] = useState();
	const [ search, setSearch ] = useState();

	useEffect(() => {}, []);

	return (
		<Fragment>
			<div className={classes.SearchWrapper}>
				<div className={classes.Search}>
					<h1>
						"Photography takes an instant out of time, altering life by holding it still" <br />
						<cite>~ Dorothea Lange</cite>
					</h1>
					<div className={classes.SearchInput}>
						<input type="text" placeholder="Search photos by categories or artists" />
						<div className={classes.SearchIcon}>
							{/* <img src="https://img.icons8.com/cotton/50/000000/search.png" alt="Search Icon" /> */}
							<img src="https://img.icons8.com/color/48/000000/search.png" alt="Search Icon" />
						</div>
					</div>
				</div>
				{/* POPULAR CATEGORIES */}
				<div />
			</div>
		</Fragment>
	);
};

export default Home;

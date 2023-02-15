**[Note:In KneedUp2.0 I have worked on adding the `subscription` feature for bookmark using `stripe`. Static typing using typescript was used. Used `prisma` replacing mongoose and improve error handling ]**

# KneedUp2.0
KneedUp2.0 is a web application for aspirants preparing from government sites. It scraps publicly available scattered data from multiple government sites and makes them available in a single place. It provides new post notification alerts and bookmark features to users to make handling of data more convenient.

## Features and interfaces

- KneedUp has multiple government sites listed for user to select. 

  ![Sidebar](https://i.imgur.com/J6WgbbB.gif)

- When a user selects the site the backend will skim through the original site to look if new posts/articles have been published, then the KneedUp database will be updated accordingly and posts/articles will be displayed to the user.

  ![Navigation](https://i.imgur.com/hcqDyf4.gif)

- After a User logs into the application then he/she can avail the bookmark and explore feautre. In case a user forgets his/her password they have the luxury to reset the password.

  ![Features](https://i.imgur.com/R94boLg.gif)

- User can filter the sites according to their preference using the explore feature.

  ![Explore](https://i.imgur.com/Be6ajrT.gif)

- User can bookmark the posts/articles for future refrencing. This feature helps in organizing the data and do focused preparation.

  ![Bookmark](https://i.imgur.com/mbroEVQ.gif)

- Logged in user will be notified once every day for all the new articles/posts published in their selected sites to avoid the need to open KneedUp habitually looking for new post/article.

## Contributing

Everyone is welcome for contribution! Fork the repo, make some changes, submit a pull-request!. 
**[Note: In the `.env` file enter you own database credential and sendgrid apikey]** 



import express from "express";
import { getContentData } from "../controllers/content Controller";
/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retrieve a list of movies or series with a movie label containing an ID and other components.
 *     tags: [Content]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: title
 *         description: The type of content to fetch (either 'movie' or 'series').
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imdbID:
 *                         type: integer
 *                         example: 003451
 *                       Title:
 *                         type: string
 *                         example: "Inception"
 *                       MovieLoaded:
 *                         type: boolean
 *                         example: true
 *                       Genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Sci-Fi", "Action"]
 *                       ReleaseYear:
 *                         type: integer
 *                         example: 2010
 *                       Rated:
 *                         type: string
 *                         example: "PG-13"
 *                       Released:
 *                         type: string
 *                         example: "2010-07-16"
 *                       Runtime:
 *                         type: string
 *                         example: "148 min"
 *                       Director:
 *                         type: string
 *                         example: "Christopher Nolan"
 *                       Writer:
 *                         type: string
 *                         example: "Jonathan Nolan, Christopher Nolan"
 *                       Actors:
 *                         type: string
 *                         example: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
 *                       Plot:
 *                         type: string
 *                         example: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
 *                       Language:
 *                         type: string
 *                         example: "English"
 *                       Country:
 *                         type: string
 *                         example: "USA"
 *                       Awards:
 *                         type: string
 *                         example: "Won 4 Oscars. 157 wins & 220 nominations total."
 *                       Poster:
 *                         type: string
 *                         example: "https://example.com/poster.jpg"
 *                       Metascore:
 *                         type: string
 *                         example: "74"
 *                       imdbRating:
 *                         type: string
 *                         example: "8.8"
 *                       Images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [
 *                           "https://example.com/image1.jpg",
 *                           "https://example.com/image2.jpg"
 *                         ]
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const movieRoutes = express.Router();

movieRoutes.get("/content", getContentData);

export default movieRoutes;

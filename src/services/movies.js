import { sortList } from "../constants/index.js";
import MovieCollection from "../db/models/Movie.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getMovies = async ({
  page = 1,
  perPage = 10,
  sortBy = "_id",
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const movieQuery = MovieCollection.find();

  if (filters.type) {
    movieQuery.where("type").equals(filters.type);
  }

  if (filters.minReleaseYear) {
    movieQuery.where("releaseYear").gte(filters.minReleaseYear);
  }

  if (filters.maxReleaseYear) {
    movieQuery.where("releaseYear").lte(filters.maxReleaseYear);
  }

  const [totalItems, items] = await Promise.all([
    MovieCollection.find().merge(movieQuery).countDocuments(),

    movieQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    items,
    totalItems,
    ...paginationData,
  };
};
export const getMovieById = (id) => MovieCollection.findOne({ _id: id });

export const addMovie = (payload) => MovieCollection.create(payload);

export const updateMovie = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const rawResult = await MovieCollection.findByIdAndUpdate({ _id }, payload, {
    upsert,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteMovieById = (_id) =>
  MovieCollection.findOneAndDelete({ _id });

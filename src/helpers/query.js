import { Op } from 'sequelize';

function convertReqQueryToLikeQuery(query, nonStringField) {
  const likeQuery = {};
  Object.keys(query).forEach((key) => {
    if (nonStringField && nonStringField.boolean && nonStringField.boolean.includes(key)) {
      likeQuery[key] = (query[key] === 'true');
    } else if (nonStringField && nonStringField.number && nonStringField.number.includes(key)) {
      likeQuery[key] = Number(query[key]);
    } else if (nonStringField && nonStringField.enum && nonStringField.enum.includes(key)) {
      likeQuery[key] = query[key];
    } else {
      likeQuery[key] = { [Op.iLike]: `%${query[key]}%` };
    }
  });
  return likeQuery;
}

export default convertReqQueryToLikeQuery;

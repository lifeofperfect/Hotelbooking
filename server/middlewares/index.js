import jwt from "express-jwt";

// export const requireSignin = expressJwt({
//   secret: `${process.env.JWT_SECRET}`,
//   algorithms: ["HS256"],
// });

export const requireSignin = jwt({
  secret: `ILOVETOCODEINC#IGUESSIWILLADDJAVASCRIPTTOTHEMIX`,
  algorithms: ["HS256"],
});

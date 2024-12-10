// import asyncHandler from "express-async-handler";

// import { prisma } from "../config/prismaConfig.js";

// export const createResidency = asyncHandler(async (req, res) => {
//   const {
//     title,
//     description,
//     price,
//     address,
//     country,
//     city,
//     facilities,
//     image,
//     userEmail,
//   } = req.body.data;

//   console.log(req.body.data);
//   try {
//     const residency = await prisma.residency.create({
//       data: {
//         title,
//         description,
//         price,
//         address,
//         country,
//         city,
//         facilities,
//         image,
//         owner: { connect: { email: userEmail } },
//       },
//     });

//     res.send({ message: "Residency created successfully", residency });
//   } catch (err) {
//     if (err.code === "P2002") {
//       throw new Error("A residency with address already there");
//     }
//     throw new Error(err.message);
//   }
// });

// // function to get all the documents/residencies
// export const  getAllResidencies = asyncHandler(async (req, res) => {
//   const residencies = await prisma.residency.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   res.send(residencies);
// });

// // function to get a specific document/residency
// export const getResidency = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   try {
//     const residency = await prisma.residency.findUnique({
//       where: { id },
//     });
//     res.send(residency);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

























import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Create a new residency
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail: userEmail,
      },
    });

    res.status(201).json({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(400); // Conflict: Duplicate data
      throw new Error("A residency with this address already exists");
    }
    res.status(500); // Internal Server Error
    throw new Error(err.message);
  }
});

// Get all residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(residencies);
  } catch (err) {
    res.status(500); // Internal Server Error
    throw new Error("Failed to fetch residencies: " + err.message);
  }
});

// Get a specific residency by ID
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    if (!residency) {
      res.status(404); // Not Found
      throw new Error("Residency not found");
    }

    res.status(200).json(residency);
  } catch (err) {
    res.status(500); // Internal Server Error
    throw new Error("Failed to fetch residency: " + err.message);
  }
});
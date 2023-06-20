import {  NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log(fullname, email, password);

  //Validar longitud del password
  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "Passaword must be at least 6 characters",
      },
      {
        status: 400,
      }
    );
  }
  //Buscar si el email existe
  try {
    await connectDB();
    const userFound = await User.findOne({email});

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      )
    }
    //Si no existe se encripta el password y se crea el User
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);
  
    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message
        },
        {
          status: 400,
        }
      )
    }
  }
  
}
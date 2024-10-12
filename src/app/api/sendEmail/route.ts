import { ExternalGoal, StandardGoal } from "@/app/interfaces/goalInterfaces";
import {
	formatExternalGoalEmail,
	formatStandardGoalEmail,
} from "@/app/utils/goalEmailFormatter";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Function to create a nodemailer transporter
const createTransporter = () => {
	const { EMAIL_USER, EMAIL_PASS, SMTP_HOST } = process.env;

	// Validate environment variables
	if (!EMAIL_USER || !EMAIL_PASS || !SMTP_HOST) {
		throw new Error("Email credentials or SMTP host are not configured.");
	}

	return nodemailer.createTransport({
		host: SMTP_HOST,
		port: 587,
		secure: false,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
};

export async function POST(req: Request) {
	try {
		const { email, goal, type } = await req.json();

		// Check if email and goal are provided
		if (!email || !goal) {
			return NextResponse.json(
				{ message: "Email and goal details are required." },
				{ status: 400 }
			);
		}

		// Create transporter
		const transporter = createTransporter();

		// Format the goal based on its type
		let formattedGoal: string;
		if (type === "Standard") {
			formattedGoal = formatStandardGoalEmail(goal as StandardGoal);
		} else if (type === "External") {
			formattedGoal = formatExternalGoalEmail(goal as ExternalGoal);
		} else {
			return NextResponse.json(
				{ message: "Unknown goal type" },
				{ status: 400 }
			);
		}

		// Email options
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: `Goooooals: ${goal.goal}`,
			html: formattedGoal,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return NextResponse.json({ message: "Email sent successfully" });
	} catch (error) {
		// Type assertion to handle the error as an instance of Error
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred.";
		console.error("Error sending email:", errorMessage);
		return NextResponse.json(
			{ message: "Failed to send email", error: errorMessage },
			{ status: 500 }
		);
	}
}

import { NextRequest, NextResponse } from "next/server";
import { addExercise, addExerciseGroup, generateExerciseGroup, getAllExercisesbyGroup, getExerciseGroup, checkImageURL, checkVideoURL } from "./services";
import { authOptions } from "@/config/authOption";
import { getServerSession } from "next-auth";
import { TExercise } from "@/types/exercise";
import { DEFAULT_EXERCISE_IMAGE } from "@/constant";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const exercises = await getAllExercisesbyGroup({ user_id: userId });

  return NextResponse.json(exercises);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const { exerciseGroup, exercises } = await request.json();

    const option = randomUUID();
    if (!exerciseGroup.existing) {
      const genratedExerciseGroup = await generateExerciseGroup({ exerciseGroupName: exerciseGroup.name, exercises: exercises });
      console.log(genratedExerciseGroup);
      const savedExerciseGroup = await addExerciseGroup({ user_id: userId, name: genratedExerciseGroup.name, description: genratedExerciseGroup.description, insight: genratedExerciseGroup.insight });
      exercises.forEach(async (exercise: TExercise) => {
        const imageExists = await checkImageURL(exercise.image || "");
        const videoExists = await checkVideoURL(exercise.videoUrl || "");
        if (imageExists && videoExists) {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, option });
        } else if (imageExists) {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, videoUrl: "", option });
        } else if (videoExists) {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, image: DEFAULT_EXERCISE_IMAGE, option });
        } else {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, image: DEFAULT_EXERCISE_IMAGE, videoUrl: "", option });
        }
      });
      return NextResponse.json({ savedExerciseGroup, exercises });
    } else {
      const savedExerciseGroup = await getExerciseGroup({ user_id: userId, group_name: exerciseGroup.name });
      exercises.forEach(async (exercise: TExercise) => {
        const imageExists = await checkImageURL(exercise.image || "");
        const videoExists = await checkVideoURL(exercise.videoUrl || "");
        if (imageExists && videoExists) {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, option });
        } else if (imageExists) {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, videoUrl: "", option });
        } else if (videoExists) {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, image: DEFAULT_EXERCISE_IMAGE, option });
        } else {
          await addExercise({ user_id: userId, group_id: savedExerciseGroup.id, ...exercise, image: DEFAULT_EXERCISE_IMAGE, videoUrl: "", option });
        }
      });
      return NextResponse.json({ savedExerciseGroup, exercises });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

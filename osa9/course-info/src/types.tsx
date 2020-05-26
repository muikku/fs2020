interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  name: 'Fundamentals' | "Typescript";
  description: string;
}

interface CoursePartDeep extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

export type CoursePart = CoursePartTwo | CoursePartWithDescription | CoursePartDeep;
export interface AddSurveyModel {
  question: string
  answers: AddSurveyAnswer[]
}

export interface AddSurveyAnswer {
  image: string
  answer: string
}

export interface AddSurvey {
  add: (data: AddSurveyModel) => Promise<void>
}

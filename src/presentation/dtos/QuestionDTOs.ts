import { QuestionType } from '../../domain/entities/Question';

export interface QuestionDTO {
  id: string;
  text: string;
  type: QuestionType;
}

export interface OptionDTO {
  id: string;
  text: string;
  questionId: string;
}

export interface QuestionWithOptionsDTO {
  id: string;
  text: string;
  type: QuestionType;
  options: OptionDTO[];
}

export interface CreateResponseDTO {
  questionId: string;
  optionId: string;
}

export interface ResponseDTO {
  id: string;
  userId: string;
  questionId: string;
  optionId: string;
  createdAt: string;
}
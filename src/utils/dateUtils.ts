import { format, startOfDay, endOfDay, differenceInHours, differenceInMinutes, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr, { locale: ptBR });
};

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'HH:mm');
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

export const getStartOfDay = (date: Date = new Date()): Date => {
  return startOfDay(date);
};

export const getEndOfDay = (date: Date = new Date()): Date => {
  return endOfDay(date);
};

export const getDurationHours = (start: Date, end: Date): number => {
  return differenceInHours(end, start);
};

export const getDurationMinutes = (start: Date, end: Date): number => {
  return differenceInMinutes(end, start);
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

export const getRelativeDay = (date: Date): string => {
  const today = startOfDay(new Date());
  const targetDay = startOfDay(date);
  
  const diffTime = today.getTime() - targetDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  return formatDate(date);
};

export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getMonthName = (date: Date): string => {
  return format(date, 'MMMM', { locale: ptBR });
};

export const getWeekDays = (): string[] => {
  return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
};

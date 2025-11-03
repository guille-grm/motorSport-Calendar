import { dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es'); //solo una vez, fuera del componente

export const localizer = dayjsLocalizer(dayjs);

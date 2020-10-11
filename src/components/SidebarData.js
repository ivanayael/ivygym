import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
      title: 'Inicio',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
  },
  {
    title: 'Alumnos',
    path: '/Alumnos',
    icon: <FaIcons.FaUsers />,
    cName: 'nav-text'
  },
  {
    title: 'Tutores',
    path: '/Tutores',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Asistencia',
    path: '/Asistencia',
    icon: <FaIcons.FaUserCheck />,
    cName: 'nav-text'
  },
  {
     title: 'Reportes de Asistencia por Nivel',
     path: '/ReporteAsistenciaNivel',
     icon: <IoIcons.IoIosListBox/>,
     cName: 'nav-text'
   },
   {
     title: 'Reportes de Pago por Nivel',
     path: '/ReportePagoNivel',
     icon: <FaIcons.FaMoneyBillAlt />,
     cName: 'nav-text'
   },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];

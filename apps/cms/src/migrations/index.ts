import * as migration_20260802_125931_initial_setup from './20260802_125931_initial_setup';
import * as migration_20260810_160946_add_course_detail_fields from './20260810_160946_add_course_detail_fields';

export const migrations = [
  {
    up: migration_20260802_125931_initial_setup.up,
    down: migration_20260802_125931_initial_setup.down,
    name: '20260802_125931_initial_setup',
  },
  {
    up: migration_20260810_160946_add_course_detail_fields.up,
    down: migration_20260810_160946_add_course_detail_fields.down,
    name: '20260810_160946_add_course_detail_fields'
  },
];

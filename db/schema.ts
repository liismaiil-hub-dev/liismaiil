import { randomUUID } from 'crypto'
import { relations, sql } from 'drizzle-orm'
import { integer, numeric, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'
const id = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID())

const createdAt = () =>
  text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()

const date = (name: string) => text(name)

const boolean = (field: string) => integer(field, { mode: 'boolean' })

export const guests = sqliteTable('guests', {

  tokenId: numeric('tokenId').unique().notNull(),
  createdAt: createdAt(),
  host: numeric('host').notNull(),
  collaboratorId: text('collaboratorId').notNull(),
  country: text('country').notNull(),
  password: text('password').notNull(),
  onLine: boolean('onLine').default(false),
},
  (table) => ({
    unq: unique().on(table.tokenId,),
  }))

export const guestsRelations = relations(guests, ({ many }) => ({
  sprints: many(sprints),
  stages: many(stages),
}))

export const stages = sqliteTable(
  'stages',
  {
    stageId: numeric('stageId').unique().notNull(),
    createdAt: createdAt(),
    souraName: text('souraName').notNull(),
    souraNb: text('souraNb').notNull(),
    grid: numeric('grid'),
    startOn: date('startOn').notNull(),
    createdById: numeric('createdById').notNull(),
    status: text('status', {
      enum: ['wait', 'live', 'started', 'ended', 'canceled'],
    })
      .default('wait')
      .notNull(),
  },
  (table) => ({
    unq: unique().on(table.createdById, table.stageId),
  })
)
export const stagesRelations = relations(stages, ({ many }) => ({
  guests: many(guests),
  ayahs: many(ayahs),
}))


export const ayahs = sqliteTable(
  'ayahs',
  {
    index: numeric('index'),
    order: numeric('order'),
    juz: numeric('juz'),
    text: text('text').notNull(),
    stageId: numeric('stageId'),
  },
  (table) => ({
    unq: unique().on(table.index, table.juz, table.order),
  })
)
export const sprints = sqliteTable(
  'sprints',
  {
    sprintId: numeric('sprintId'),
    createdAt: createdAt(),
    souraName: text('souraName').notNull(),
    souraNb: text('souraNb').notNull(),
    grid: text('grid'),

    startOn: date('startOn').notNull(),
    createdById: numeric('createdById').notNull(),

    attendeeId: numeric('attendeeId'),
    rsvpId: numeric('srvpId'),

    country: text('country'),
    status: text('status', {
      enum: ['wait', 'live', 'started', 'ended', 'canceled'],
    })
      .default('wait')
      .notNull(),
  },
  (table) => ({
    unq: unique().on(table.createdById, table.sprintId),
  })
)

export const sprintsRelations = relations(sprints, ({ many, one }) => ({
  ayahs: many(ayahs),
  createdBy: one(guests, {
    references: [guests.tokenId],
    fields: [sprints.createdById],
  }),
}))

export const sprintsSrvpsRelations = relations(sprints, ({ many, one }) => ({
  srvps: many(rsvps),
  sprintId: one(sprints, {
    references: [sprints.sprintId],
    fields: [sprints.rsvpId],
  }),
}))

export const attendees = sqliteTable('attendees', {
  id: id(),
  createdAt: createdAt(),
  sprint: text('sprint').notNull().unique(),
})

export const attendeesRelations = relations(guests, ({ many }) => ({
  guests: many(guests),
}))

export const rsvps = sqliteTable(
  'rsvps',
  {
    id: id(),
    createdAt: createdAt(),
    attendeeId: text('attendeeId'),
    sprintId: numeric('sprintId'),
    status: text('status', {
      enum: ['going', 'not-going', 'maybe'],
    })
      .default('going')
      .notNull(),
  },
  (table) => ({
    unq: unique().on(table.attendeeId, table.sprintId),
  })
)

export const rsvpsRelations = relations(sprints, ({ one }) => ({
  attendee: one(attendees, {
    fields: [sprints.attendeeId],
    references: [attendees.id],
  }),
  sprint: one(sprints, {
    references: [sprints.sprintId],
    fields: [sprints.sprintId],
  }),
}))

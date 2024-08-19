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

  createdAt: createdAt(),
  tokenId: numeric('tokenId').unique().notNull(),
  host: numeric('host').notNull(),
  collaboratorId: text('collaboratorId').notNull(),
  country: text('country').notNull(),
  password: text('password').notNull(),
  stages: text('password').notNull(),
  onLine: boolean('onLine').default(false),
},
  (table) => ({
    unq: unique().on(table.tokenId,),
  }))

export const guestsRelations = relations(guests, ({ many }) => ({
  sprints: many(sprints),
}))

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
    unq: unique().on(table.createdById, table.id),
  })
)

export const sprintsRelations = relations(sprints, ({ many, one }) => ({
  sprints: many(sprints),
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
  guests: text('guests').notNull(),
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

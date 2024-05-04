import passport from 'passport';
import Strategy from 'passport-discord';
import { DiscordUser } from '../mongosse/schemas/discord-user.mjs';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await DiscordUser.findById(id);
    if (!findUser) throw new Error('User not found');
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
      scope: ['identify', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      let findUser;
      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id });
      } catch (error) {
        return done(error, null);
      }
      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            discordId: profile.id,
            username: profile.username,
          });
          const newSaveUser = await newUser.save();
          return done(null, newSaveUser);
        }
        return done(null, findUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

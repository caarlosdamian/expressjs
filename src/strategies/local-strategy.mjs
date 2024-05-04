import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongosse/schemas/user.mjs';
import { comparePassword } from '../utils/helpers.mjs';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error('User not found');
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error('User not found');
      const isCorrectPassword = await comparePassword(
        password,
        findUser.password
      );
      if (!isCorrectPassword) throw new Error('Invalid Credentials');
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);

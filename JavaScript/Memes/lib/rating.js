'use strict';


const updateMemes = (lulzierMeme, dankerMeme) => {
  lulzierMeme.views++;
  lulzierMeme.lulz += 1 + (dankerMeme ? dankerMeme.lulz : 0);
  lulzierMeme.rating = lulzierMeme.lulz / lulzierMeme.views;
  if (!dankerMeme) return;
  dankerMeme.views++;
  dankerMeme.rating = dankerMeme.lulz / dankerMeme.views;
};

const calculate = (user, memesInfo) => {
  const empty = { lulz: 0, views: 0, rating: 0 };

  const lulzier = memesInfo.filter(lul => lul.clicked);
  const danker = memesInfo.filter(lul => !lul.clicked);

  if (user.memes.length === 0) {
    if (danker.length === 0) {
      const newMemes = lulzier.map((meme) => {
        const newMeme = Object.assign({ _id: meme._id }, empty);
        updateMemes(newMeme);
        return newMeme;
      });
      return newMemes;
    } else {
      const lulzierMeme = Object.assign({ _id: lulzier[0]._id }, empty);
      const dankerMeme = Object.assign({ _id: danker[0]._id }, empty);
      updateMemes(lulzierMeme, dankerMeme);
      return [ lulzierMeme, dankerMeme ];
    }
  } else if (danker.length === 0) {
    const newMemes = lulzier.map((meme) => {
      for (const i in user.memes) {
        if (meme._id === user.memes[i]._id) return user.memes[i];
      }
      return Object.assign({ _id: meme._id }, empty);
    });
    newMemes.forEach(meme => updateMemes(meme));
    return newMemes;
  } else {
    let lulzierMeme = user.memes.filter(meme =>
      (meme._id === lulzier[0]._id)
    );
    let dankerMeme = user.memes.filter(meme =>
      (meme._id === danker[0]._id)
    );
    lulzierMeme = lulzierMeme[0] || Object.assign(
      { _id: lulzier[0]._id }, empty
    );
    dankerMeme = dankerMeme[0] || Object.assign(
      { _id: danker[0]._id }, empty
    );
    updateMemes(lulzierMeme, dankerMeme);

    return [ lulzierMeme, dankerMeme ];
  }
};

const updateForUser = (user, newMemes) => {
  if (user.memes.length === 0) return { $set: { memes: newMemes } };

  const memes = user.memes.map((meme) => {
    for (const i in newMemes) {
      if (meme._id === newMemes[i]._id) return newMemes[i];
    }
    return meme;
  });

  newMemes.forEach(newMeme => {
    let has = false;
    for (const i in memes) {
      if (newMeme._id === memes[i]._id) has = true;
    }
    if (!has) memes.push(newMeme);
  });

  return { $set: { memes } };
};

const getUserMemes = (user, memesInfo) => {
  const memes = user.memes.filter((meme) => {
    for (const i in memesInfo) {
      if (meme._id === memesInfo[i]._id) return true;
    }
    return false;
  });
  const memesById = {};
  memes.forEach((meme) => {
    const id = meme._id;
    const lulz = meme.lulz;
    const views = meme.views;
    const rating = meme.rating;
    memesById[id] = { lulz, views, rating };
  });

  return memesById;
};

const updateTotal = (meme, deltaRating, newUser = false) => {
  const data = {};

  data.usersWatched = meme.usersWatched + (newUser ? 1 : 0);
  data.rating = meme.rating + deltaRating / data.usersWatched;

  return { $set: data };
};

module.exports = {
  calculate,
  updateForUser,
  getUserMemes,
  updateTotal
};

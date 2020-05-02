const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')


const Profile = require('../../models/Profile')
const User = require('../../models/User')




// @route   GET api/profile/me
// @desc    Get current profile
// @access  Private
router.get('/me', auth, async (req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

});



// @route   GET api/profile
// @desc    create or update user profile
// @access  Private
router.post('/', [auth,
    [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'skills are required').not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body


    const profileFields = {}

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim().toUpperCase());

    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {

            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile)
        }

        profile = new Profile(profileFields);

        await profile.save()

        return res.json(profile)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }

});


// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {

    try {

        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }

});



// @route   GET api/profile/user/:user_id
// @desc    Get profiles by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {

    try {

        const profile = await Profile.find({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (profile.length == 0) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.json(profile)

    } catch (error) {
        console.error(error.message);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }

        res.status(500).send('Server Error')
    }

})


// @route   DELETE api/profile
// @desc    DELETE profile, user, posts
// @access  Private
router.delete('/', auth, async (req, res) => {

    try {

        //Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})



// @route   PUT api/profile/experience
// @desc    add profile experience
// @access  Private
router.put('/experience', [auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),

    ]
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = req.body;



    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    }


    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }



});





// @route   DELETE api/profile/experience/:exp_id
// @desc    DELETE experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {

    try {


        const profile = await Profile.findOne({ user: req.user.id });


        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})



// @route   PUT api/profile/education
// @desc    add profile education
// @access  Private
router.put('/education', [auth,
    [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'degree is required').not().isEmpty(),
        check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),

    ]
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = req.body;



    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    }


    try {

        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }



});





// @route   DELETE api/profile/education/:edu_id
// @desc    DELETE education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {

    try {


        const profile = await Profile.findOne({ user: req.user.id });


        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

})


module.exports = router;
require('dotenv').config();

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.API_TOKEN;

if (!API_TOKEN) {
    console.error('❌ API_TOKEN not found. Please set it in .env');
    process.exit(1);
}

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    },
});

async function seedData() {
    try {
        console.log('🌱 Starting seed...\n');

        // 1. Create Impact Stats
        console.log('📊 Creating Impact Stats...');
        const stats = [
            { label: 'Youth Empowered', value: '2,500+', description: 'Young people transformed through our programmes' },
            { label: 'Active Programmes', value: '12+', description: 'Diverse initiatives across Rwanda' },
            { label: 'Partner Organizations', value: '15+', description: 'Strategic partners supporting our mission' },
            { label: 'Team Members', value: '50+', description: 'Dedicated professionals' },
        ];

        for (const stat of stats) {
            try {
                await api.post('/impact-stats', { data: stat });
                console.log(`  ✓ Created: ${stat.label}`);
            } catch (err) {
                console.log(`  ℹ Attempt: ${stat.label}`, err.response?.data || err.message);
            }
        }

        // 2. Create Programmes
        console.log('\n📚 Creating Programmes...');
        const programmes = [
            {
                name: 'Youth Leadership Program',
                slug: 'youth-leadership-program',
                short_description: 'Develop future leaders through intensive training and mentorship',
                description: '<p>Our flagship Youth Leadership Program is designed to identify and nurture emerging leaders among Rwanda\'s youth. Through a combination of classroom training, experiential learning, and personalized mentorship, participants develop the skills and mindset needed to lead positive change in their communities.</p>',
                is_featured: true,
                order: 1,
            },
            {
                name: 'Digital Skills Training',
                slug: 'digital-skills-training',
                short_description: 'Master digital competencies for the 21st century economy',
                description: '<p>In today\'s digital world, technical skills are essential. Our Digital Skills Training program equips youth with proficiency in coding, digital marketing, data analysis, and other in-demand technical competencies.</p>',
                is_featured: true,
                order: 2,
            },
            {
                name: 'Entrepreneurship Bootcamp',
                slug: 'entrepreneurship-bootcamp',
                short_description: 'Turn your ideas into successful businesses',
                description: '<p>Have a business idea? Our Entrepreneurship Bootcamp provides aspiring young entrepreneurs with the knowledge, skills, and network needed to launch and grow successful ventures.</p>',
                is_featured: true,
                order: 3,
            },
        ];

        for (const prog of programmes) {
            try {
                await api.post('/programmes', { data: prog });
                console.log(`  ✓ Created: ${prog.name}`);
            } catch (err) {
                console.log(`  ℹ Attempt: ${prog.name}`, err.response?.data || err.message);
            }
        }

        // 3. Create News Articles
        console.log('\n📰 Creating News Articles...');
        const articles = [
            {
                title: 'Iteka Launches New Digital Skills Program',
                slug: 'iteka-launches-digital-skills',
                excerpt: 'We are excited to announce the launch of our comprehensive Digital Skills Training program designed to equip youth with 21st-century competencies.',
                content: '<p>Iteka Youth Organization is thrilled to announce the launch of our new Digital Skills Training program. This comprehensive initiative is designed to equip young people in Rwanda with the technical competencies needed to thrive in today\'s digital economy.</p><p>The program covers coding, web development, digital marketing, and data analysis.</p>',
                article_date: new Date().toISOString(),
                category: 'Announcement',
                is_featured: true,
            },
            {
                title: '500 Youth Graduate from Leadership Program',
                slug: '500-youth-graduate-leadership',
                excerpt: 'This month, we celebrated the graduation of 500 young leaders who have completed our intensive Youth Leadership Program.',
                content: '<p>This month, we celebrated the graduation of 500 young leaders who have completed our intensive Youth Leadership Program. These graduates are now equipped with the skills and confidence to lead positive change in their communities.</p>',
                article_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                category: 'Achievement',
            },
            {
                title: 'Iteka Partners with Tech Companies for Skills Training',
                slug: 'iteka-partners-tech-companies',
                excerpt: 'In a major partnership announcement, Iteka Youth Organization has partnered with leading technology companies to provide advanced skills training.',
                content: '<p>We are proud to announce strategic partnerships with leading technology companies who will support our digital skills training initiatives. These partnerships will provide our youth with access to world-class training and employment opportunities.</p>',
                article_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                category: 'Event',
            },
        ];

        for (const article of articles) {
            try {
                await api.post('/actualites', { data: article });
                console.log(`  ✓ Created: ${article.title}`);
            } catch (err) {
                console.log(`  ℹ Attempt: ${article.title}`, err.response?.data || err.message);
            }
        }

        // 4. Create Testimonials
        console.log('\n💬 Creating Testimonials...');
        const testimonials = [
            {
                quote: 'The Youth Leadership Program completely transformed my perspective on leadership. I now feel confident to lead projects in my community.',
                author_name: 'Marie Uwase',
                author_role: 'Programme Graduate 2024',
                is_featured: true,
                order: 1,
            },
            {
                quote: 'Thanks to the Digital Skills Training, I landed my first tech job. Iteka gave me the skills and confidence I needed.',
                author_name: 'Jean Pierre Habimana',
                author_role: 'Digital Skills Graduate',
                is_featured: true,
                order: 2,
            },
            {
                quote: 'The mentorship I received through Iteka was invaluable. My mentor helped me navigate challenges and achieve my goals.',
                author_name: 'Amina Nyiramatama',
                author_role: 'Mentorship Program Participant',
                is_featured: true,
                order: 3,
            },
        ];

        for (const testimonial of testimonials) {
            try {
                await api.post('/testimonials', { data: testimonial });
                console.log(`  ✓ Created: ${testimonial.author_name}`);
            } catch (err) {
                console.log(`  ℹ Attempt: ${testimonial.author_name}`, err.response?.data || err.message);
            }
        }

        // 5. Create Team Members
        console.log('\n👥 Creating Team Members...');
        const teamMembers = [
            {
                name: 'Dr. Jean Bosco Nzeyimana',
                role: 'Executive Director',
                bio: '<p>Jean Bosco is the visionary leader behind Iteka Youth Organization with over 15 years of experience in youth development and social impact.</p>',
                email: 'jbosco@itekarwanda.org',
                is_leadership: true,
                order: 1,
            },
            {
                name: 'Grace Umuhire',
                role: 'Head of Programmes',
                bio: '<p>Grace oversees all of Iteka\'s programme development and implementation with a passion for youth empowerment.</p>',
                email: 'grace@itekarwanda.org',
                is_leadership: true,
                order: 2,
            },
            {
                name: 'Olivier Gatete',
                role: 'Digital Skills Coordinator',
                bio: '<p>Olivier leads our digital skills training initiatives and has trained hundreds of youth in coding and tech skills.</p>',
                email: 'olivier@itekarwanda.org',
                is_leadership: false,
                order: 3,
            },
            {
                name: 'Esther Mutesi',
                role: 'Leadership Development Officer',
                bio: '<p>Esther is passionate about developing the next generation of leaders in Rwanda through mentorship and training.</p>',
                email: 'esther@itekarwanda.org',
                is_leadership: false,
                order: 4,
            },
        ];

        for (const member of teamMembers) {
            try {
                await api.post('/team-members', { data: member });
                console.log(`  ✓ Created: ${member.name}`);
            } catch (err) {
                console.log(`  ℹ Attempt: ${member.name}`, err.response?.data || err.message);
            }
        }

        // 6. Create Partners
        console.log('\n🤝 Creating Partners...');
        const partners = [
            {
                name: 'Rwanda ICT Association',
                description: 'Supporting digital transformation in Rwanda',
                partnership_type: 'Technical',
                is_featured: true,
                order: 1,
            },
            {
                name: 'World Bank Group',
                description: 'Supporting youth employment and entrepreneurship',
                partnership_type: 'Financial',
                is_featured: true,
                order: 2,
            },
            {
                name: 'UNICEF Rwanda',
                description: 'Supporting youth development initiatives',
                partnership_type: 'Strategic',
                is_featured: true,
                order: 3,
            },
            {
                name: 'Kigali Innovation City',
                description: 'Providing workspace and resources',
                partnership_type: 'Technical',
                is_featured: false,
                order: 4,
            },
        ];

        for (const partner of partners) {
            try {
                await api.post('/partners', { data: partner });
                console.log(`  ✓ Created: ${partner.name}`);
            } catch (err) {
                console.log(`  ℹ Attempt: ${partner.name}`, err.response?.data || err.message);
            }
        }

        // 7. Create Festival
        console.log('\n🎉 Creating Festival...');
        const festival = {
            title: 'Iteka African Culture Festival',
            edition: '2025 Edition',
            description: '<p>The Iteka African Culture Festival is an annual celebration of African heritage, youth talent, and community unity. This year\'s festival will feature live performances, exhibitions, workshops, and networking opportunities.</p><p>Join us for a week-long celebration of culture, talent, and togetherness!</p>',
            date_start: new Date('2025-06-15').toISOString().split('T')[0],
            date_end: new Date('2025-06-21').toISOString().split('T')[0],
            location: 'Kigali, Rwanda',
            registration_url: 'https://forms.gle/festival2025',
        };

        try {
            await api.put('/festival', { data: festival });
            console.log(`  ✓ Created: ${festival.title}`);
        } catch (err) {
            console.log(`  ℹ Attempt: Festival`, err.response?.data || err.message);
        }

        console.log('\n✅ Seed completed!');
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        process.exit(1);
    }
}

seedData();
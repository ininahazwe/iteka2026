'use client';

import { useQuery } from '@tanstack/react-query';
import { Users, Linkedin } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchTeamMembers } from '@/src/lib/api';
import styles from './Team.module.css';
import shared from '@/src/styles/shared.module.css';

export default function TeamPage() {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: fetchTeamMembers,
  });

  const leadership = teamMembers.filter((member: any) => member?.is_leadership);
  const team = teamMembers.filter((member: any) => !member?.is_leadership);

  return (
      <>
      <Header />

      <main>
        {/* Hero */}
        <section className={shared.pageHero}>
          <div className={shared.pageHeroInner}>
            <div className={styles.heroIcon}>
              <Users size={28} />
            </div>
            <h1 className={shared.pageHeroTitle}>Meet Our Team</h1>
            <p className={shared.pageHeroText}>
              Dedicated professionals committed to empowering Rwanda's youth and creating lasting change
            </p>
          </div>
        </section>

        {/* Leadership Team */}
        {leadership.length > 0 && (
            <section className={styles.leadershipSection}>
              <div className={shared.container}>
                <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 16 }}>Leadership Team</h2>
                <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                  Our experienced leaders guide Iteka's vision and strategy
                </p>

                <div className={styles.leadershipGrid}>
                  {leadership.map((member: any) => (
                      <div key={member.id} className={styles.leaderCard}>
                        {member?.photo?.data?.url && (
                            <div className={styles.leaderPhoto}>
                              <img
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.data.url}`}
                                  alt={member?.name}
                              />
                            </div>
                        )}
                        <div className={styles.leaderBody}>
                          <h3 className={styles.leaderName}>{member?.name}</h3>
                          <p className={styles.leaderRole}>{member?.role}</p>
                          {member?.bio && (
                              <p className={styles.leaderBio}>
                                {member.bio.replace(/<[^>]*>/g, '')}
                              </p>
                          )}
                          {member?.linkedin_url && (
                          <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.leaderLinkedin}
                            >
                            <Linkedin size={16} />
                            Connect on LinkedIn
                            </a>
                            )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Team Members */}
        {team.length > 0 && (
            <section className={styles.teamSection}>
              <div className={shared.container}>
                <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>Our Team</h2>

                <div className={styles.teamGrid}>
                  {team.map((member: any) => (
                      <div key={member.id} className={styles.teamCard}>
                        {member?.photo?.data?.url && (
                            <div className={styles.teamPhoto}>
                              <img
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.data.url}`}
                                  alt={member?.name}
                              />
                            </div>
                        )}
                        <div className={styles.teamBody}>
                          <h3 className={styles.teamName}>{member?.name}</h3>
                          <p className={styles.teamRole}>{member?.role}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Loading State */}
        {isLoading && (
            <div className={shared.loadingWrap}>
              <div className={shared.spinner}></div>
              <p className={shared.loadingText}>Loading team...</p>
            </div>
        )}

        {/* Empty State */}
        {!isLoading && teamMembers.length === 0 && (
            <div className={styles.emptyWrap}>
              <p className={styles.emptyText}>No team members found.</p>
            </div>
        )}

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={shared.container}>
            <div className={shared.bandBox}>
              <h2 className={shared.bandTitle}>Join Our Team</h2>
              <p className={shared.bandText}>
                We're always looking for passionate individuals to join our mission
              </p>
              <a href="/contact" className={shared.btnPrimary}>
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>

  <Footer />
</>
);
}

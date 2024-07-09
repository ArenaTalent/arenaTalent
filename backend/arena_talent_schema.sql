--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: employer_members; Type: TABLE; Schema: public; Owner: oschwartz
--

CREATE TABLE public.employer_members (
    id integer NOT NULL,
    employer_id integer,
    member_email character varying(255) NOT NULL,
    role character varying(50),
    status character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    profile_picture_url character varying(255),
    cover_photo_url character varying(255),
    CONSTRAINT employer_members_status_check CHECK (((status)::text = ANY ((ARRAY['invited'::character varying, 'active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.employer_members OWNER TO oschwartz;

--
-- Name: employer_members_id_seq; Type: SEQUENCE; Schema: public; Owner: oschwartz
--

CREATE SEQUENCE public.employer_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employer_members_id_seq OWNER TO oschwartz;

--
-- Name: employer_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oschwartz
--

ALTER SEQUENCE public.employer_members_id_seq OWNED BY public.employer_members.id;


--
-- Name: employer_profiles; Type: TABLE; Schema: public; Owner: oschwartz
--

CREATE TABLE public.employer_profiles (
    id integer NOT NULL,
    user_id integer,
    company_description text,
    website character varying(255),
    location character varying(255),
    work_from_home_policy character varying(50),
    top_ranking boolean,
    linkedin character varying(255),
    industry character varying(50),
    number_of_open_jobs integer,
    benefits text[],
    recent_news text,
    team text,
    profile_picture_url character varying(255),
    cover_photo_url character varying(255)
);


ALTER TABLE public.employer_profiles OWNER TO oschwartz;

--
-- Name: employer_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: oschwartz
--

CREATE SEQUENCE public.employer_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employer_profiles_id_seq OWNER TO oschwartz;

--
-- Name: employer_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oschwartz
--

ALTER SEQUENCE public.employer_profiles_id_seq OWNED BY public.employer_profiles.id;


--
-- Name: job_applications; Type: TABLE; Schema: public; Owner: oschwartz
--

CREATE TABLE public.job_applications (
    id integer NOT NULL,
    jobseeker_id integer,
    job_posting_id integer,
    cover_letter text,
    status character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT job_applications_status_check CHECK (((status)::text = ANY ((ARRAY['submitted'::character varying, 'in_review'::character varying, 'interview'::character varying, 'accepted'::character varying, 'rejected'::character varying])::text[])))
);


ALTER TABLE public.job_applications OWNER TO oschwartz;

--
-- Name: job_applications_id_seq; Type: SEQUENCE; Schema: public; Owner: oschwartz
--

CREATE SEQUENCE public.job_applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_applications_id_seq OWNER TO oschwartz;

--
-- Name: job_applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oschwartz
--

ALTER SEQUENCE public.job_applications_id_seq OWNED BY public.job_applications.id;


--
-- Name: job_postings; Type: TABLE; Schema: public; Owner: oschwartz
--

CREATE TABLE public.job_postings (
    id integer NOT NULL,
    employer_id integer,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    recommended_skills text[],
    nice_to_haves text[],
    responsibilities text,
    location character varying(255),
    level character varying(50),
    department character varying(50),
    type character varying(50),
    in_office_policy character varying(50),
    salary character varying(255),
    recruiter character varying(255),
    number_of_applicants integer DEFAULT 0
);


ALTER TABLE public.job_postings OWNER TO oschwartz;

--
-- Name: job_postings_id_seq; Type: SEQUENCE; Schema: public; Owner: oschwartz
--

CREATE SEQUENCE public.job_postings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_postings_id_seq OWNER TO oschwartz;

--
-- Name: job_postings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oschwartz
--

ALTER SEQUENCE public.job_postings_id_seq OWNED BY public.job_postings.id;


--
-- Name: jobseeker_profiles; Type: TABLE; Schema: public; Owner: oschwartz
--

CREATE TABLE public.jobseeker_profiles (
    id integer NOT NULL,
    user_id integer,
    resume text,
    skills text[],
    experience text,
    gender character varying(50),
    race character varying(50),
    education text,
    years_experience integer,
    job_level character varying(50),
    previous_industries text[],
    memberof text[],
    startup_experience boolean,
    linkedin character varying(255),
    portfolio character varying(255),
    website character varying(255),
    instagram character varying(255),
    phone character varying(20),
    languages text[],
    open_to_opportunities boolean,
    location character varying(255),
    profile_picture_url character varying(255),
    cover_photo_url character varying(255)
);


ALTER TABLE public.jobseeker_profiles OWNER TO oschwartz;

--
-- Name: jobseeker_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: oschwartz
--

CREATE SEQUENCE public.jobseeker_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobseeker_profiles_id_seq OWNER TO oschwartz;

--
-- Name: jobseeker_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oschwartz
--

ALTER SEQUENCE public.jobseeker_profiles_id_seq OWNED BY public.jobseeker_profiles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: oschwartz
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    company_name character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['jobseeker'::character varying, 'employer'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO oschwartz;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: oschwartz
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO oschwartz;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: oschwartz
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: employer_members id; Type: DEFAULT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_members ALTER COLUMN id SET DEFAULT nextval('public.employer_members_id_seq'::regclass);


--
-- Name: employer_profiles id; Type: DEFAULT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_profiles ALTER COLUMN id SET DEFAULT nextval('public.employer_profiles_id_seq'::regclass);


--
-- Name: job_applications id; Type: DEFAULT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_applications ALTER COLUMN id SET DEFAULT nextval('public.job_applications_id_seq'::regclass);


--
-- Name: job_postings id; Type: DEFAULT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_postings ALTER COLUMN id SET DEFAULT nextval('public.job_postings_id_seq'::regclass);


--
-- Name: jobseeker_profiles id; Type: DEFAULT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.jobseeker_profiles ALTER COLUMN id SET DEFAULT nextval('public.jobseeker_profiles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: employer_members employer_members_member_email_key; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_members
    ADD CONSTRAINT employer_members_member_email_key UNIQUE (member_email);


--
-- Name: employer_members employer_members_pkey; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_members
    ADD CONSTRAINT employer_members_pkey PRIMARY KEY (id);


--
-- Name: employer_profiles employer_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_profiles
    ADD CONSTRAINT employer_profiles_pkey PRIMARY KEY (id);


--
-- Name: employer_profiles employer_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_profiles
    ADD CONSTRAINT employer_profiles_user_id_key UNIQUE (user_id);


--
-- Name: job_applications job_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_pkey PRIMARY KEY (id);


--
-- Name: job_postings job_postings_pkey; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_postings
    ADD CONSTRAINT job_postings_pkey PRIMARY KEY (id);


--
-- Name: jobseeker_profiles jobseeker_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.jobseeker_profiles
    ADD CONSTRAINT jobseeker_profiles_pkey PRIMARY KEY (id);


--
-- Name: jobseeker_profiles jobseeker_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.jobseeker_profiles
    ADD CONSTRAINT jobseeker_profiles_user_id_key UNIQUE (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: employer_members employer_members_employer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_members
    ADD CONSTRAINT employer_members_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.users(id);


--
-- Name: employer_profiles employer_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.employer_profiles
    ADD CONSTRAINT employer_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: job_applications job_applications_job_posting_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_job_posting_id_fkey FOREIGN KEY (job_posting_id) REFERENCES public.job_postings(id);


--
-- Name: job_applications job_applications_jobseeker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_applications
    ADD CONSTRAINT job_applications_jobseeker_id_fkey FOREIGN KEY (jobseeker_id) REFERENCES public.users(id);


--
-- Name: job_postings job_postings_employer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.job_postings
    ADD CONSTRAINT job_postings_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.users(id);


--
-- Name: jobseeker_profiles jobseeker_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: oschwartz
--

ALTER TABLE ONLY public.jobseeker_profiles
    ADD CONSTRAINT jobseeker_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


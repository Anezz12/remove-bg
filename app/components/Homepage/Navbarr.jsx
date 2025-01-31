'use client';
import Link from 'next/link';
import profileDefault from '@/app/assets/image/profile.png';
import { useState, useEffect, useRef } from 'react';
import { sigout, useSession } from 'next-auth/react';
